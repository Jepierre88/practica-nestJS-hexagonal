import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

// Application — Ports
import { CryptoPort } from '@auth/application/port/in/crypto.port';
import { LoginUseCase } from '@auth/application/port/in/login.port';
import { CredentialRepositoryPort } from '@auth/application/port/out/credential-repository.port';
import { JwtPort } from '@auth/application/port/out/jwt.port';

// Application — Use Cases
import { CryptoService } from '@auth/application/usecases/crypto.service';
import { LoginService } from '@auth/application/usecases/login.service';

// Infrastructure — Persistence
import { CredentialOrmEntity } from './adapters/out/persistence/typeorm/entities/credential-orm.entity';
import { TypeOrmCredentialRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-credential.repository';

// Infrastructure — Auth
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAdapterService } from './services/jwt-adapter.service';
import { JwtAuthGuard } from './adapters/in/rest/guards/jwt-auth.guard';

// Infrastructure — REST
import { AuthController } from './adapters/in/rest/auth.controller';

// Cross-module
import UsersModule from '@users/infrastructure/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CredentialOrmEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'] ?? 'super-secret-key-change-in-production',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    // ─── Passport Strategy ─────────────────────────────────
    JwtStrategy,

    // ─── Global Guard (protects ALL routes by default) ─────
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    // ─── Output Port → Persistence Adapter ─────────────────
    {
      provide: CredentialRepositoryPort,
      useClass: TypeOrmCredentialRepository,
    },

    // ─── JWT Port → Adapter ────────────────────────────────
    {
      provide: JwtPort,
      useClass: JwtAdapterService,
    },

    // ─── Crypto Port → Implementation ──────────────────────
    {
      provide: CryptoPort,
      useClass: CryptoService,
    },

    // ─── Input Ports → Use Cases ───────────────────────────
    {
      provide: LoginUseCase,
      useClass: LoginService,
    },
  ],
  exports: [CredentialRepositoryPort, CryptoPort, JwtPort],
})
export default class AuthModule {}