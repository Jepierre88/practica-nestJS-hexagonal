import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeaponRepositoryPort } from '@cs2/weapon/application/ports/out/weapon-repository.port';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { WeaponOrmEntity } from '../entities/weapon-orm.entity';
import { WeaponPersistenceMapper } from '../mappers/weapon-persistence.mapper';

@Injectable()
export class TypeOrmWeaponRepository implements WeaponRepositoryPort {
  constructor(
    @InjectRepository(WeaponOrmEntity)
    private readonly repository: Repository<WeaponOrmEntity>,
  ) {}

  async create(entity: Weapon): Promise<Weapon> {
    const orm = WeaponPersistenceMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return WeaponPersistenceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Weapon | null> {
    const orm = await this.repository.findOne({ where: { id } });
    return orm ? WeaponPersistenceMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Weapon[]> {
    const entities = await this.repository.findBy({});
    return entities.map(WeaponPersistenceMapper.toDomain);
  }

  async update(id: string, entity: Weapon): Promise<Weapon> {
    const orm = WeaponPersistenceMapper.toOrm(entity);
    orm.id = id;
    const saved = await this.repository.save(orm);
    return WeaponPersistenceMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
