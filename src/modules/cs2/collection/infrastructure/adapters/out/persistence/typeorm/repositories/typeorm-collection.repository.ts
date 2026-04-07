import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionRepositoryPort } from '@cs2/collection/application/ports/out/collection-repository.port';
import { Collection } from '@cs2/collection/domain/models/collection.model';
import { CollectionOrmEntity } from '../entities/collection-orm.entity';
import { CollectionPersistenceMapper } from '../mappers/collection-persistence.mapper';

@Injectable()
export class TypeOrmCollectionRepository implements CollectionRepositoryPort {
  private readonly mapper = new CollectionPersistenceMapper();

  constructor(
    @InjectRepository(CollectionOrmEntity)
    private readonly repository: Repository<CollectionOrmEntity>,
  ) {}

  async create(entity: Collection): Promise<Collection> {
    const orm = this.mapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return this.mapper.toDomain(saved);
  }

  async findById(id: string): Promise<Collection | null> {
    const orm = await this.repository.findOne({ where: { id } });
    return orm ? this.mapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Collection[]> {
    const entities = await this.repository.findBy({});
    return entities.map((orm) => this.mapper.toDomain(orm));
  }

  async update(id: string, entity: Collection): Promise<Collection> {
    const orm = this.mapper.toOrm(entity);
    orm.id = id;
    const saved = await this.repository.save(orm);
    return this.mapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
