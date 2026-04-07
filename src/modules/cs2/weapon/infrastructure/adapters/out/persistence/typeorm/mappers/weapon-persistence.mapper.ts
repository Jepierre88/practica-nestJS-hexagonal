import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { WeaponOrmEntity } from '../entities/weapon-orm.entity';

export class WeaponPersistenceMapper {
  static toOrm(domain: Weapon): WeaponOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new WeaponOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  static toDomain(orm: WeaponOrmEntity): Weapon {
    return Weapon.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
