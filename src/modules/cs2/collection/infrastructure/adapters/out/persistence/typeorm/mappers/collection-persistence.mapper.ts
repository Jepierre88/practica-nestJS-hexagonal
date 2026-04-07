import { Collection } from '@cs2/collection/domain/models/collection.model';
import { CollectionOrmEntity } from '../entities/collection-orm.entity';

export class CollectionPersistenceMapper {
  static toOrm(domain: Collection): CollectionOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new CollectionOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  static toDomain(orm: CollectionOrmEntity): Collection {
    return Collection.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
