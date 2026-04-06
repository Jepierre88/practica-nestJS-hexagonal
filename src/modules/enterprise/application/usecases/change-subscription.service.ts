import { ChangeSubscriptionCommand } from '../commands/change-subscription.command';
import { ChangeSubscriptionUseCase } from '../ports/in/change-subscription.usecase';

export class ChangeSubscriptionService implements ChangeSubscriptionUseCase {
  execute(command: ChangeSubscriptionCommand): Promise<void> {
    // TODO: implementar lógica para cambiar la suscripción
    console.log(
      `Changing subscription for user ${command.userId} to plan ${command.newPlan}`,
    );
    return Promise.resolve();
  }
}
