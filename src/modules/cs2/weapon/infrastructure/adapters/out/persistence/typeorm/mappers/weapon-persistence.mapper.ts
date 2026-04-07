import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { WeaponOrmEntity } from '../entities/weapon-orm.entity';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';

export class WeaponPersistenceMapper extends PersistenceMapper<Weapon, WeaponOrmEntity> {
  toOrm(domain: Weapon): WeaponOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new WeaponOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  toDomain(orm: WeaponOrmEntity): Weapon {
    return Weapon.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
