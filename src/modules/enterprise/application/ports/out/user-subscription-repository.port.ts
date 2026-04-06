import { AssignSubscriptionCommand } from '@enterprise/application/commands/assign-subscription.command';

export abstract class UserSubscriptionRepositoryPort {
  abstract assignSubscriptionToUser(
    command: AssignSubscriptionCommand,
  ): Promise<void>;

  abstract assignDefaultSubscription(userId: string): Promise<void>;
}
