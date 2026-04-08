import { Collection } from '@cs2/collection/domain/models/collection.model';
import { CollectionOrmEntity } from '../entities/collection-orm.entity';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';

export class CollectionPersistenceMapper extends PersistenceMapper<
  Collection,
  CollectionOrmEntity
> {
  toOrm(domain: Collection): CollectionOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new CollectionOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  toDomain(orm: CollectionOrmEntity): Collection {
    return Collection.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
