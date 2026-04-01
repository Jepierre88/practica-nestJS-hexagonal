import { User } from '@users/domain/models/user.model';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';

export class UserPersistenceMapper {
  static toDomain(orm: UserOrmEntity): User {
    return User.reconstruct({
      id: orm.id,
      name: orm.name,
      lastName: orm.lastName,
      email: orm.email,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: User): UserOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new UserOrmEntity();
    if (primitives.id) {
      orm.id = primitives.id;
    }
    orm.name = primitives.name;
    orm.lastName = primitives.lastName;
    orm.email = primitives.email;
    return orm;
  }
}
