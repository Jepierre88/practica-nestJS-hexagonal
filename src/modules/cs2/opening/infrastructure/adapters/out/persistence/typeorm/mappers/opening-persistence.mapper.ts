import { Opening } from '@cs2/opening/domain/models/opening.model';
import { OpeningCase } from '@cs2/opening/domain/models/opening-case.model';
import { Case } from '@cs2/case/domain/models/case.model';
import { CaseSkin } from '@cs2/case/domain/models/case-skin.model';
import { Skin } from '@cs2/skin/domain/models/skin.model';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { Collection } from '@cs2/collection/domain/models/collection.model';
import { OpeningOrmEntity } from '../entities/opening-orm.entity';
import { OpeningCaseOrmEntity } from '../entities/opening-case-orm.entity';
import { SkinOrmEntity } from '@cs2/skin/infrastructure/adapters/out/persistence/typeorm/entities/skin-orm.entity';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';

export class OpeningPersistenceMapper extends PersistenceMapper<
  Opening,
  OpeningOrmEntity
> {
  toOrm(domain: Opening): OpeningOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new OpeningOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    orm.openingCases = primitives.openingCases.map((oc) => {
      const ocOrm = new OpeningCaseOrmEntity();
      ocOrm.caseId = oc.case.id!;
      ocOrm.resultSkinId = oc.resultSkin.id!;
      return ocOrm;
    });
    return orm;
  }

  toDomain(orm: OpeningOrmEntity): Opening {
    const openingCases = (orm.openingCases ?? []).map((ocOrm) => {
      const caseEntity = this.reconstructCase(ocOrm);
      const resultSkin = this.reconstructSkin(ocOrm.resultSkin);
      return OpeningCase.create({ case: caseEntity, resultSkin: resultSkin });
    });

    return Opening.reconstruct({
      id: orm.id,
      name: orm.name,
      openingCases,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  private reconstructCase(ocOrm: OpeningCaseOrmEntity): Case {
    const caseOrm = ocOrm.case;
    const caseSkins = (caseOrm.caseSkins ?? []).map((csOrm) => {
      const skin = this.reconstructSkin(csOrm.skin);
      return CaseSkin.create({ skin, dropRate: Number(csOrm.dropRate) });
    });

    return Case.reconstruct({
      id: caseOrm.id,
      name: caseOrm.name,
      price: Number(caseOrm.price),
      caseSkins,
      createdAt: caseOrm.createdAt,
      updatedAt: caseOrm.updatedAt,
    });
  }

  private reconstructSkin(skinOrm: SkinOrmEntity): Skin {
    return Skin.reconstruct({
      id: skinOrm.id,
      name: skinOrm.name,
      price: Number(skinOrm.price),
      skinFloat: Number(skinOrm.skinFloat),
      weapon: Weapon.reconstruct({
        id: skinOrm.weapon.id,
        name: skinOrm.weapon.name,
        createdAt: skinOrm.weapon.createdAt,
        updatedAt: skinOrm.weapon.updatedAt,
      }),
      collection: Collection.reconstruct({
        id: skinOrm.collection.id,
        name: skinOrm.collection.name,
        createdAt: skinOrm.collection.createdAt,
        updatedAt: skinOrm.collection.updatedAt,
      }),
      createdAt: skinOrm.createdAt,
      updatedAt: skinOrm.updatedAt,
    });
  }
}
