import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramLanguajeRepositoryPort } from '@program-languajes/application/ports/out/program-languaje-repository.port';
import { ProgramLanguaje } from '@program-languajes/domain/models/program-languaje.model';
import { ProgramLanguajeEntity } from '../entities/program-languaje.entity';
import { Repository } from 'typeorm';
import { ProgramLanguajePersistenceMapper } from '../mappers/program-languaje-persistence.mapper';
import { PaginatedModel } from '@shared/domain/models/paginated.model';
import { ListPaginatedCommand } from '@shared/application/commands/list-paginated.command';
import { TypeOrmFilteredPaginatedRepository } from '@shared/infrastructure/persistence/typeorm-filtered-paginated.repository';

@Injectable()
export class TypeOrmProgramLanguajeRepository
  extends TypeOrmFilteredPaginatedRepository<
    ProgramLanguajeEntity,
    ProgramLanguaje
  >
  implements ProgramLanguajeRepositoryPort
{
  // ─── Configuración de listFilteredPaginated ────────────────
  protected readonly allowedFilters = ['difficulty'];
  protected readonly allowedOrderBy = ['name', 'createdAt', 'difficulty'];
  protected readonly searchableFields = ['name', 'description'];

  constructor(
    @InjectRepository(ProgramLanguajeEntity)
    protected readonly ormRepository: Repository<ProgramLanguajeEntity>,
    protected readonly mapper: ProgramLanguajePersistenceMapper,
  ) {
    super();
  }

  async create(entity: ProgramLanguaje): Promise<ProgramLanguaje> {
    const ormEntity = this.mapper.toOrm(entity);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return this.mapper.toDomain(savedEntity);
  }
  async findById(id: string): Promise<ProgramLanguaje | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.mapper.toDomain(ormEntity) : null;
  }
  async findAll(): Promise<ProgramLanguaje[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map((e) => this.mapper.toDomain(e));
  }
  async update(id: string, entity: ProgramLanguaje): Promise<ProgramLanguaje> {
    const ormEntity = this.mapper.toOrm(entity);
    const updatedEntity = await this.ormRepository.save({ ...ormEntity, id });
    return this.mapper.toDomain(updatedEntity);
  }
  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByName(name: string): Promise<ProgramLanguaje | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { name } });
    return ormEntity ? this.mapper.toDomain(ormEntity) : null;
  }

  async findByDifficulty(difficulty: number): Promise<ProgramLanguaje[]> {
    const ormEntities = await this.ormRepository.find({
      where: { difficulty },
    });
    return ormEntities.map((e) => this.mapper.toDomain(e));
  }

  async listPaginated(params: ListPaginatedCommand): Promise<PaginatedModel> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    });
    const items = entities.map((e) => this.mapper.toDomain(e));
    const totalPages = Math.ceil(total / params.limit);
    return PaginatedModel.create({
      items,
      totalItems: total,
      currentPage: params.page,
      totalPages,
      hasNextPage: params.page < totalPages,
      hasPreviousPage: params.page > 1,
    });
  }
}
