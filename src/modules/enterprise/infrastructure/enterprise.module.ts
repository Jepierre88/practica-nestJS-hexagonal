import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionOrmEntity } from './adapters/out/persistence/typeorm/entities/subscription.entity';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { SubscriptionRepositoryPort } from '@enterprise/application/ports/out/subscription-repository.port';
import { TypeOrmSubscriptionRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-subscription.repository';
import { UserSubscriptionRepositoryPort } from '@enterprise/application/ports/out/user-subscription-repository.port';
import { TypeormUserSubscriptionRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-user-subscription.repository';
import { SubscriptionPersistenceMapper } from './adapters/out/persistence/typeorm/mappers/subcription-persistence.mapper';
import { AssignSubscriptionUseCase } from '@enterprise/application/ports/in/assign-subscription.usecase';
import { AssignSubscriptionService } from '@enterprise/application/usecases/assign-subscription.service';
import { ChangeSubscriptionUseCase } from '@enterprise/application/ports/in/change-subscription.usecase';
import { ChangeSubscriptionService } from '@enterprise/application/usecases/change-subscription.service';
import { EnterpriseController } from './adapters/in/rest/enterprise.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionOrmEntity, UserOrmEntity])],
  controllers: [EnterpriseController],
  providers: [
    {
      provide: SubscriptionRepositoryPort,
      useClass: TypeOrmSubscriptionRepository,
    },
    {
      provide: UserSubscriptionRepositoryPort,
      useClass: TypeormUserSubscriptionRepository,
    },
    {
      provide: AssignSubscriptionUseCase,
      useClass: AssignSubscriptionService,
    },
    {
      provide: ChangeSubscriptionUseCase,
      useClass: ChangeSubscriptionService,
    },
    SubscriptionPersistenceMapper,
  ],
  exports: [UserSubscriptionRepositoryPort],
})
export class EnterpriseModule {}
