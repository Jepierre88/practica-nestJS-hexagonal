import { Skin } from '@cs2/skin/domain/models/skin.model';
import { SkinOrmEntity } from '../entities/skin-orm.entity';

export class SkinPersistenceMapper {
  static toOrm(domain: Skin): SkinOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new SkinOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  static toDomain(orm: SkinOrmEntity): Skin {
    return Skin.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
