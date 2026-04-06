import { ChangeSubscriptionCommand } from '../commands/change-subscription.command';
import { ChangeSubscriptionUseCase } from '../ports/in/change-subscription.usecase';

export class ChangeSubscriptionService implements ChangeSubscriptionUseCase {
  async execute(command: ChangeSubscriptionCommand): Promise<void> {
    // Aquí iría la lógica para cambiar la suscripción del usuario
    // Por ejemplo, podrías interactuar con un repositorio para actualizar la información del usuario
    console.log(
      `Changing subscription for user ${command.userId} to plan ${command.newPlan}`,
    );
  }
}
