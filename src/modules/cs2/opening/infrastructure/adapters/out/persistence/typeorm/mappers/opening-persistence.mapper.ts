import { Opening } from '@cs2/opening/domain/models/opening.model';
import { OpeningOrmEntity } from '../entities/opening-orm.entity';

export class OpeningPersistenceMapper {
  static toOrm(domain: Opening): OpeningOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new OpeningOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  static toDomain(orm: OpeningOrmEntity): Opening {
    return Opening.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
