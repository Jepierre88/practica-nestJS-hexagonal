import { UserSubscriptionRepositoryPort } from '@enterprise/application/ports/out/user-subscription-repository.port';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionOrmEntity } from '../entities/subscription.entity';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { AssignSubscriptionCommand } from '@enterprise/application/commands/assign-subscription.command';
import { UserNotFoundException } from '@enterprise/domain/exceptions/user-not-found.exception';
import { NotFoundSubscriptionException } from '@enterprise/domain/exceptions/subscriptions.enum';
import { ESubscriptionType } from '@enterprise/domain/enums/subscription-type.enum';

@Injectable()
export class TypeormUserSubscriptionRepository implements UserSubscriptionRepositoryPort {
  constructor(
    @InjectRepository(SubscriptionOrmEntity)
    private readonly subscriptionRepository: Repository<SubscriptionOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}
  async assignSubscriptionToUser(
    command: AssignSubscriptionCommand,
  ): Promise<void> {
    const [user, subscription] = await Promise.all([
      this.userRepository.findOne({ where: { id: command.userId } }),
      this.subscriptionRepository.findOne({
        where: { id: command.subscriptionId },
      }),
    ]);
    if (!user) {
      throw new UserNotFoundException(command.userId);
    }
    if (!subscription) {
      throw new NotFoundSubscriptionException(command.subscriptionId);
    }

    user.subscriptionId = command.subscriptionId;
    await this.userRepository.save(user);
  }

  async assignDefaultSubscription(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const freeSubscription = this.subscriptionRepository.create({
      subscriptionType: ESubscriptionType.Free,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    const saved = await this.subscriptionRepository.save(freeSubscription);

    user.subscription = saved;
    await this.userRepository.save(user);
  }
}
