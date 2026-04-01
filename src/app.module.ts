import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '@task/infrastructure/task.module';
import { TaskOrmEntity } from '@task/infrastructure/adapters/out/persistence/typeorm/entities/task-orm.entity';
import AuthModule from '@auth/infrastructure/auth.module';
import UsersModule from '@users/infrastructure/users.module';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';
import { ProgramLanguajesModule } from './modules/program-languajes/infrastructure/program-languajes.module';
import { ProgramLanguajeEntity } from '@program-languajes/infrastructure/adapters/out/persistence/typeorm/entities/program-languaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DB_HOST'] ?? 'localhost',
      port: parseInt(process.env['DB_PORT'] ?? '5432', 10),
      username: process.env['DB_USERNAME'] ?? 'postgres',
      password: process.env['DB_PASSWORD'] ?? 'postgres',
      database: process.env['DB_NAME'] ?? 'practice_nest',
      entities: [TaskOrmEntity, UserOrmEntity, CredentialOrmEntity, ProgramLanguajeEntity],
      synchronize: false,
      migrationsRun: true,
      migrations: ['dist/database/migrations/*'],
      migrationsTableName: 'migrations',
    }),
    TaskModule,
    AuthModule,
    UsersModule,
    ProgramLanguajesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
