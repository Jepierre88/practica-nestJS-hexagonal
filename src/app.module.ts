import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '@task/infrastructure/task.module';
import { TaskOrmEntity } from '@task/infrastructure/adapters/out/persistence/typeorm/entities/task-orm.entity';
import AuthModule from '@auth/infrastructure/auth.module';
import UsersModule from '@users/infrastructure/users.module';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';
import { ProgramLanguajesModule } from './modules/program-languajes/infrastructure/program-languajes.module';
import { ProgramLanguajeEntity } from '@program-languajes/infrastructure/adapters/out/persistence/typeorm/entities/program-languaje.entity';
import { GeneralResponseInterceptor } from '@shared/infrastructure/interceptors/general-response.interceptor';
import { SubscriptionOrmEntity } from '@enterprise/infrastructure/adapters/out/persistence/typeorm/entities/subscription.entity';
import { EnterpriseModule } from '@enterprise/infrastructure/enterprise.module';
import { Cs2Module } from './modules/cs2/cs2.module';
import { CaseOrmEntity } from '@cs2/case/infrastructure/adapters/out/persistence/typeorm/entities/case-orm.entity';
import { CaseSkinOrmEntity } from '@cs2/case/infrastructure/adapters/out/persistence/typeorm/entities/case-skin-orm.entity';
import { CollectionOrmEntity } from '@cs2/collection/infrastructure/adapters/out/persistence/typeorm/entities/collection-orm.entity';
import { OpeningOrmEntity } from '@cs2/opening/infrastructure/adapters/out/persistence/typeorm/entities/opening-orm.entity';
import { OpeningCaseOrmEntity } from '@cs2/opening/infrastructure/adapters/out/persistence/typeorm/entities/opening-case-orm.entity';
import { SkinOrmEntity } from '@cs2/skin/infrastructure/adapters/out/persistence/typeorm/entities/skin-orm.entity';
import { WeaponOrmEntity } from '@cs2/weapon/infrastructure/adapters/out/persistence/typeorm/entities/weapon-orm.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD') ?? 'postgres',
        database: config.get<string>('DB_NAME', 'practice_nest'),
        entities: [
          TaskOrmEntity,
          UserOrmEntity,
          CredentialOrmEntity,
          ProgramLanguajeEntity,
          SubscriptionOrmEntity,
          WeaponOrmEntity,
          SkinOrmEntity,
          CaseOrmEntity,
          CaseSkinOrmEntity,
          OpeningOrmEntity,
          OpeningCaseOrmEntity,
          CollectionOrmEntity,
        ],
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/database/migrations/*'],
        migrationsTableName: 'migrations',
      }),
    }),
    TaskModule,
    AuthModule,
    UsersModule,
    ProgramLanguajesModule,
    EnterpriseModule,
    Cs2Module,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GeneralResponseInterceptor,
    },
  ],
})
export class AppModule {}
