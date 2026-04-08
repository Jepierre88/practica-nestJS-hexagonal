import {
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  FindOptionsOrder,
  ILike,
} from 'typeorm';
import { PaginatedModel } from '@shared/domain/models/paginated.model';
import { ListFilteredPaginatedCommand } from '@shared/application/commands/list-filtered-paginated.command';
import { DomainModel } from '@shared/domain/models/domain.model';
import { PageOutOfRangeException } from '@shared/domain/exceptions/page-out-of-range.exception';
import { FilteredPaginatedRepositoryPort } from '@shared/application/ports/out/filtered-paginated-repository.port';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';

/**
 * Repositorio base reutilizable para listados paginados con filtros y búsqueda.
 *
 * Cada módulo extiende esta clase, configura los campos permitidos
 * y obtiene `listFilteredPaginated` sin duplicar código.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class TypeOrmTaskRepository
 *   extends TypeOrmFilteredPaginatedRepository<TaskOrmEntity, Task>
 *   implements TaskRepositoryPort
 * {
 *   protected readonly allowedFilters = ['status', 'userId'];
 *   protected readonly allowedOrderBy = ['createdAt', 'title'];
 *   protected readonly searchableFields = ['title', 'description'];
 *
 *   constructor(
 *     @InjectRepository(TaskOrmEntity)
 *     protected readonly ormRepository: Repository<TaskOrmEntity>,
 *     protected readonly mapper: TaskPersistenceMapper,
 *   ) {
 *     super();
 *   }
 *
 *   // ... otros métodos del repositorio
 * }
 * ```
 *
 * @template OrmEntity  - Entidad TypeORM (ej. TaskOrmEntity)
 * @template Domain     - Modelo de dominio (ej. Task)
 */
export abstract class TypeOrmFilteredPaginatedRepository<
  OrmEntity extends ObjectLiteral,
  Domain extends DomainModel<any>,
> implements FilteredPaginatedRepositoryPort {
  /** Repositorio TypeORM inyectado en la clase hija */
  protected abstract readonly ormRepository: Repository<OrmEntity>;

  /** Mapper de persistencia inyectado en la clase hija */
  protected abstract readonly mapper: PersistenceMapper<Domain, OrmEntity>;

  /** Campos de la entidad ORM que se pueden usar como filtros exactos */
  protected abstract readonly allowedFilters: string[];

  /** Campos de la entidad ORM por los que se puede ordenar */
  protected abstract readonly allowedOrderBy: string[];

  /** Campos de la entidad ORM en los que se busca con ILIKE */
  protected abstract readonly searchableFields: string[];

  async listFilteredPaginated(
    params: ListFilteredPaginatedCommand,
  ): Promise<PaginatedModel> {
    const baseWhere = this.buildFilterConditions(params.filters);
    const where = this.buildWhereWithSearch(baseWhere, params.search);
    const order = this.buildOrder(params.orderBy, params.order);

    const [entities, total] = await this.ormRepository.findAndCount({
      where,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      ...(Object.keys(order).length > 0 ? { order } : {}),
    });

    const items = entities.map((e) => this.mapper.toDomain(e));
    const totalPages = Math.ceil(total / params.limit) || 1;

    if (total > 0 && params.page > totalPages) {
      throw new PageOutOfRangeException(params.page, totalPages);
    }

    return PaginatedModel.create({
      items,
      totalItems: total,
      currentPage: params.page,
      totalPages,
      hasNextPage: params.page < totalPages,
      hasPreviousPage: params.page > 1,
    });
  }

  private buildFilterConditions(
    filters?: Record<string, any>,
  ): FindOptionsWhere<OrmEntity> {
    const where: FindOptionsWhere<OrmEntity> = {};

    if (!filters) return where;

    for (const [key, value] of Object.entries(filters)) {
      if (
        this.allowedFilters.includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== ''
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        (where as any)[key] = value;
      }
    }

    return where;
  }

  private buildWhereWithSearch(
    baseWhere: FindOptionsWhere<OrmEntity>,
    search?: string,
  ): FindOptionsWhere<OrmEntity> | FindOptionsWhere<OrmEntity>[] {
    if (!search || this.searchableFields.length === 0) {
      return baseWhere;
    }

    return this.searchableFields.map((field) => ({
      ...baseWhere,
      [field]: ILike(`%${search}%`),
    })) as FindOptionsWhere<OrmEntity>[];
  }

  private buildOrder(
    orderBy?: string,
    order?: 'ASC' | 'DESC',
  ): FindOptionsOrder<OrmEntity> {
    const result: FindOptionsOrder<OrmEntity> = {};

    if (orderBy && this.allowedOrderBy.includes(orderBy)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (result as any)[orderBy] = order ?? 'ASC';
    }

    return result;
  }
}
