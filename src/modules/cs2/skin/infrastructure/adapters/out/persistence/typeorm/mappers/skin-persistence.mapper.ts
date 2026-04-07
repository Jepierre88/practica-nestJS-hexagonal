import { Skin } from '@cs2/skin/domain/models/skin.model';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { Collection } from '@cs2/collection/domain/models/collection.model';
import { SkinOrmEntity } from '../entities/skin-orm.entity';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';

export class SkinPersistenceMapper extends PersistenceMapper<Skin, SkinOrmEntity> {
  toOrm(domain: Skin): SkinOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new SkinOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    orm.price = primitives.price;
    orm.skinFloat = primitives.skinFloat;
    orm.weaponId = primitives.weapon.id!;
    orm.collectionId = primitives.collection.id!;
    return orm;
  }

  toDomain(orm: SkinOrmEntity): Skin {
    return Skin.reconstruct({
      id: orm.id,
      name: orm.name,
      price: Number(orm.price),
      skinFloat: Number(orm.skinFloat),
      weapon: Weapon.reconstruct({
        id: orm.weapon.id,
        name: orm.weapon.name,
        createdAt: orm.weapon.createdAt,
        updatedAt: orm.weapon.updatedAt,
      }),
      collection: Collection.reconstruct({
        id: orm.collection.id,
        name: orm.collection.name,
        createdAt: orm.collection.createdAt,
        updatedAt: orm.collection.updatedAt,
      }),
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
