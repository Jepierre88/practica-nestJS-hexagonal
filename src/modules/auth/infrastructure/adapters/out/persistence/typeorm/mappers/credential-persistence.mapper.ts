import { Injectable } from '@nestjs/common';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';
import { Credential } from '@auth/domain/models/credential.model';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';

@Injectable()
export class CredentialPersistenceMapper extends PersistenceMapper<
  Credential,
  CredentialOrmEntity
> {
  toDomain(orm: CredentialOrmEntity): Credential {
    return Credential.reconstruct({
      id: orm.id,
      userId: orm.userId,
      passwordHash: orm.passwordHash,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  toOrm(domain: Credential): CredentialOrmEntity {
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
