import { Subscription } from '@enterprise/domain/model/subscription.model';
import { CrudRepositoryPort } from '@shared/application/ports/out/crud-repository.port';

export abstract class SubscriptionRepositoryPort implements CrudRepositoryPort<Subscription> {
  abstract create(entity: Subscription): Promise<Subscription>;
  abstract findById(id: string): Promise<Subscription | null>;
  abstract findAll(): Promise<Subscription[]>;
  abstract update(id: string, entity: Subscription): Promise<Subscription>;
  abstract delete(id: string): Promise<void>;
}
