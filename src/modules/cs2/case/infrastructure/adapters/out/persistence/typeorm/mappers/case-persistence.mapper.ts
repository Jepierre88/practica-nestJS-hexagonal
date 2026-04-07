import { Case } from '@cs2/case/domain/models/case.model';
import { CaseOrmEntity } from '../entities/case-orm.entity';

export class CasePersistenceMapper {
  static toOrm(domain: Case): CaseOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new CaseOrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  static toDomain(orm: CaseOrmEntity): Case {
    return Case.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
