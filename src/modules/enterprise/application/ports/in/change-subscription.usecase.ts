import { ChangeSubscriptionCommand } from '@enterprise/application/commands/change-subscription.command';
import { UseCasePort } from '@shared/application/ports/in/use-case.port';

export abstract class ChangeSubscriptionUseCase implements UseCasePort<
  ChangeSubscriptionCommand,
  void
> {
  abstract execute(command: ChangeSubscriptionCommand): Promise<void>;
}
