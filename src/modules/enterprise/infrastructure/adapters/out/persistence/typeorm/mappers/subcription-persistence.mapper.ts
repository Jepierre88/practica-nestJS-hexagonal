import { Injectable } from '@nestjs/common';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';
import { Subscription } from '@enterprise/domain/model/subscription.model';
import { SubscriptionOrmEntity } from '../entities/subscription.entity';

@Injectable()
export class SubscriptionPersistenceMapper extends PersistenceMapper<
  Subscription,
  SubscriptionOrmEntity
> {
  toDomain(subscription: SubscriptionOrmEntity): Subscription {
    return Subscription.reconstruct({
      id: subscription.id,
      subscriptionType: subscription.subscriptionType,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    });
  }

  toOrm(subscription: Subscription): SubscriptionOrmEntity {
    const primitives = subscription.toPrimitives();
    const orm = new SubscriptionOrmEntity();
    if (primitives.id) {
      orm.id = primitives.id;
    }
    orm.subscriptionType = primitives.subscriptionType;
    orm.startDate = primitives.startDate;
    orm.endDate = primitives.endDate;
    return orm;
  }
}
