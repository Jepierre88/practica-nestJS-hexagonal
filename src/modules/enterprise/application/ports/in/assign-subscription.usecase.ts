import { AssignSubscriptionCommand } from '@enterprise/application/commands/assign-subscription.command';
import { UseCasePort } from '@shared/application/ports/in/use-case.port';

export abstract class AssignSubscriptionUseCase implements UseCasePort<
  AssignSubscriptionCommand,
  void
> {
  abstract execute(command: AssignSubscriptionCommand): Promise<void>;
  abstract defaultSubscription(userId: string): Promise<void>;
}
