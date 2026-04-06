import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Application — Ports
import { RegisterUserUseCase } from '@users/application/ports/in/register-user.port';
import { FindUsersUseCase } from '@users/application/ports/in/find-users.port';
import { UpdateUserUseCase } from '@users/application/ports/in/update-user.port';
import { DeleteUserUseCase } from '@users/application/ports/in/delete-user.port';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';

// Application — Use Cases
import { RegisterUserService } from '@users/application/usecases/register-user.service';
import { FindUsersService } from '@users/application/usecases/find-users.service';
import { UpdateUserService } from '@users/application/usecases/update-user.service';
import { DeleteUserService } from '@users/application/usecases/delete-user.service';

// Infrastructure — Persistence
import { UserOrmEntity } from './adapters/out/persistence/typeorm/entities/user-orm.entity';
import { TypeOrmUserRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-user.repository';
import { UserPersistenceMapper } from './adapters/out/persistence/typeorm/mappers/user-persistence.mapper';

// Infrastructure — REST
import { UsersController } from './adapters/in/rest/users.controller';
import { UserDtoMapper } from './adapters/in/rest/mappers/user-dto.mapper';

// Cross-module
import AuthModule from '@auth/infrastructure/auth.module';
import { EnterpriseModule } from '@enterprise/infrastructure/enterprise.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => EnterpriseModule),
  ],
  controllers: [UsersController],
  providers: [
    // ─── Mapper ──────────────────────────────────────────────
    UserPersistenceMapper,
    UserDtoMapper,

    // ─── Output Port → Persistence Adapter ─────────────────
    {
      provide: UserRepositoryPort,
      useClass: TypeOrmUserRepository,
    },

    // ─── Input Ports → Use Cases ───────────────────────────
    {
      provide: RegisterUserUseCase,
      useClass: RegisterUserService,
    },
    {
      provide: FindUsersUseCase,
      useClass: FindUsersService,
    },
    {
      provide: UpdateUserUseCase,
      useClass: UpdateUserService,
    },
    {
      provide: DeleteUserUseCase,
      useClass: DeleteUserService,
    },
  ],
  exports: [UserRepositoryPort],
})
export default class UsersModule {}
