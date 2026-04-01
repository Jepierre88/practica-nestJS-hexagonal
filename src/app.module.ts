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
        entities: [TaskOrmEntity, UserOrmEntity, CredentialOrmEntity, ProgramLanguajeEntity],
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/database/migrations/*'],
        migrationsTableName: 'migrations',
      }),
    }),
    TaskModule,
    AuthModule,
    UsersModule,
    ProgramLanguajesModule
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
