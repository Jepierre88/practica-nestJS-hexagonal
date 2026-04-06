import { Inject, Injectable } from '@nestjs/common';
import { AssignSubscriptionCommand } from '../commands/assign-subscription.command';
import { AssignSubscriptionUseCase } from '../ports/in/assign-subscription.usecase';
import { UserSubscriptionRepositoryPort } from '../ports/out/user-subscription-repository.port';

@Injectable()
export class AssignSubscriptionService implements AssignSubscriptionUseCase {
  constructor(
    @Inject(UserSubscriptionRepositoryPort)
    private readonly userSubscriptionRepository: UserSubscriptionRepositoryPort,
  ) {}

  async execute(command: AssignSubscriptionCommand): Promise<void> {
    await this.userSubscriptionRepository.assignSubscriptionToUser(command);
  }

  async defaultSubscription(userId: string): Promise<void> {
    await this.userSubscriptionRepository.assignDefaultSubscription(userId);
  }
}
