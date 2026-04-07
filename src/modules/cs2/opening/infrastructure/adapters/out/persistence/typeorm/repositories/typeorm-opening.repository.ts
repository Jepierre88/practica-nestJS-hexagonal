import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpeningRepositoryPort } from '@cs2/opening/application/ports/out/opening-repository.port';
import { Opening } from '@cs2/opening/domain/models/opening.model';
import { OpeningOrmEntity } from '../entities/opening-orm.entity';
import { OpeningPersistenceMapper } from '../mappers/opening-persistence.mapper';

@Injectable()
export class TypeOrmOpeningRepository implements OpeningRepositoryPort {
  constructor(
    @InjectRepository(OpeningOrmEntity)
    private readonly repository: Repository<OpeningOrmEntity>,
  ) {}

  async create(entity: Opening): Promise<Opening> {
    const orm = OpeningPersistenceMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return OpeningPersistenceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Opening | null> {
    const orm = await this.repository.findOne({ where: { id } });
    return orm ? OpeningPersistenceMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Opening[]> {
    const entities = await this.repository.findBy({});
    return entities.map(OpeningPersistenceMapper.toDomain);
  }

  async update(id: string, entity: Opening): Promise<Opening> {
    const orm = OpeningPersistenceMapper.toOrm(entity);
    orm.id = id;
    const saved = await this.repository.save(orm);
    return OpeningPersistenceMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
