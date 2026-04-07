import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkinRepositoryPort } from '@cs2/skin/application/ports/out/skin-repository.port';
import { Skin } from '@cs2/skin/domain/models/skin.model';
import { SkinOrmEntity } from '../entities/skin-orm.entity';
import { SkinPersistenceMapper } from '../mappers/skin-persistence.mapper';

@Injectable()
export class TypeOrmSkinRepository implements SkinRepositoryPort {
  private readonly mapper = new SkinPersistenceMapper();

  constructor(
    @InjectRepository(SkinOrmEntity)
    private readonly repository: Repository<SkinOrmEntity>,
  ) {}

  async create(entity: Skin): Promise<Skin> {
    const orm = this.mapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return this.mapper.toDomain(saved);
  }

  async findById(id: string): Promise<Skin | null> {
    const orm = await this.repository.findOne({
      where: { id },
      relations: ['weapon', 'collection'],
    });
    return orm ? this.mapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Skin[]> {
    const entities = await this.repository.find({
      relations: ['weapon', 'collection'],
    });
    return entities.map((orm) => this.mapper.toDomain(orm));
  }

  async update(id: string, entity: Skin): Promise<Skin> {
    const orm = this.mapper.toOrm(entity);
    orm.id = id;
    const saved = await this.repository.save(orm);
    return this.mapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
