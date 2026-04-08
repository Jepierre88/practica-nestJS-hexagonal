import { Case } from '@cs2/case/domain/models/case.model';
import { CaseSkin } from '@cs2/case/domain/models/case-skin.model';
import { Skin } from '@cs2/skin/domain/models/skin.model';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { Collection } from '@cs2/collection/domain/models/collection.model';
import { CaseOrmEntity } from '../entities/case-orm.entity';
import { CaseSkinOrmEntity } from '../entities/case-skin-orm.entity';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';

export class CasePersistenceMapper extends PersistenceMapper<
  Case,
  CaseOrmEntity
> {
  toOrm(domain: Case): CaseOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new CaseOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    orm.price = primitives.price;
    orm.caseSkins = primitives.caseSkins.map((cs) => {
      const csOrm = new CaseSkinOrmEntity();
      csOrm.skinId = cs.skin.id!;
      csOrm.dropRate = cs.dropRate;
      return csOrm;
    });
    return orm;
  }

  toDomain(orm: CaseOrmEntity): Case {
    const caseSkins = (orm.caseSkins ?? []).map((csOrm) => {
      const skin = Skin.reconstruct({
        id: csOrm.skin.id,
        name: csOrm.skin.name,
        price: Number(csOrm.skin.price),
        skinFloat: Number(csOrm.skin.skinFloat),
        weapon: Weapon.reconstruct({
          id: csOrm.skin.weapon.id,
          name: csOrm.skin.weapon.name,
          createdAt: csOrm.skin.weapon.createdAt,
          updatedAt: csOrm.skin.weapon.updatedAt,
        }),
        collection: Collection.reconstruct({
          id: csOrm.skin.collection.id,
          name: csOrm.skin.collection.name,
          createdAt: csOrm.skin.collection.createdAt,
          updatedAt: csOrm.skin.collection.updatedAt,
        }),
        createdAt: csOrm.skin.createdAt,
        updatedAt: csOrm.skin.updatedAt,
      });
      return CaseSkin.create({ skin, dropRate: Number(csOrm.dropRate) });
    });

    return Case.reconstruct({
      id: orm.id,
      name: orm.name,
      price: Number(orm.price),
      caseSkins,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
