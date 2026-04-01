import { Credential } from '@auth/domain/models/credential.model';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';

export class CredentialPersistenceMapper {
  static toDomain(orm: CredentialOrmEntity): Credential {
    return Credential.reconstruct({
      id: orm.id,
      userId: orm.userId,
      passwordHash: orm.passwordHash,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: Credential): CredentialOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new CredentialOrmEntity();
    if (primitives.id) {
      orm.id = primitives.id;
    }
    orm.userId = primitives.userId;
    orm.passwordHash = primitives.passwordHash;
    return orm;
  }
}
