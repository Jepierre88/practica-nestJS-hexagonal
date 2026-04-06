import { Injectable } from '@nestjs/common';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';
import { User } from '@users/domain/models/user.model';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { Subscription } from '@enterprise/domain/model/subscription.model';

@Injectable()
export class UserPersistenceMapper extends PersistenceMapper<
  User,
  UserOrmEntity
> {
  toDomain(orm: UserOrmEntity): User {
    return User.reconstruct({
      id: orm.id,
      name: orm.name,
      lastName: orm.lastName,
      email: orm.email,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      subscription: orm.subscription
        ? Subscription.reconstruct({
            id: orm.subscription.id,
            subscriptionType: orm.subscription.subscriptionType,
            startDate: orm.subscription.startDate,
            endDate: orm.subscription.endDate,
            createdAt: orm.subscription.createdAt,
            updatedAt: orm.subscription.updatedAt,
          })
        : undefined,
    });
  }

  toOrm(domain: User): UserOrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new UserOrmEntity();
    if (primitives.id) {
      orm.id = primitives.id;
    }
    orm.name = primitives.name;
    orm.lastName = primitives.lastName;
    orm.email = primitives.email;
    if (primitives.subscriptionId) {
      orm.subscriptionId = primitives.subscriptionId;
    }
    return orm;
  }
}
