import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramLanguajeRepositoryPort } from 'src/modules/program-languajes/application/ports/out/program-languaje-repository.port';
import { ProgramLanguaje } from 'src/modules/program-languajes/domain/models/program-languaje.model';
import { ProgramLanguajeEntity } from '../entities/program-languaje.entity';
import { Repository } from 'typeorm';
import { ProgramLanguajePersistenceMapper } from '../mappers/program-languaje-persistence.mapper';
import { PaginatedModel } from '@shared/domain/models/paginated.model';
import { ListPaginatedCommand } from '@shared/application/commands/list-paginated.command';

@Injectable()
export class TypeOrmProgramLanguajeRepository implements ProgramLanguajeRepositoryPort {
  constructor(
    @InjectRepository(ProgramLanguajeEntity)
    private readonly repository: Repository<ProgramLanguajeEntity>,
    private readonly mapper: ProgramLanguajePersistenceMapper,
  ) {}

  async create(entity: ProgramLanguaje): Promise<ProgramLanguaje> {
    const ormEntity = this.mapper.toOrm(entity);
    const savedEntity = await this.repository.save(ormEntity);
    return this.mapper.toDomain(savedEntity);
  }
  async findById(id: string): Promise<ProgramLanguaje | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.mapper.toDomain(ormEntity) : null;
  }
  async findAll(): Promise<ProgramLanguaje[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map((e) => this.mapper.toDomain(e));
  }
  async update(id: string, entity: ProgramLanguaje): Promise<ProgramLanguaje> {
    const ormEntity = this.mapper.toOrm(entity);
    const updatedEntity = await this.repository.save({ ...ormEntity, id });
    return this.mapper.toDomain(updatedEntity);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByName(name: string): Promise<ProgramLanguaje | null> {
    const ormEntity = await this.repository.findOne({ where: { name } });
    return ormEntity ? this.mapper.toDomain(ormEntity) : null;
  }

  async findByDifficulty(difficulty: number): Promise<ProgramLanguaje[]> {
    const ormEntities = await this.repository.find({
      where: { difficulty },
    });
    return ormEntities.map((e) => this.mapper.toDomain(e));
  }

  async listPaginated(params: ListPaginatedCommand): Promise<PaginatedModel> {
    const [entities, total] = await this.repository.findAndCount({
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
