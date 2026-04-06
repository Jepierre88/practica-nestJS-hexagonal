import { Injectable } from '@nestjs/common';
import {
  LoginUseCase,
  LoginCommand,
  LoginResult,
} from '@auth/application/port/in/login.port';
import { CredentialRepositoryPort } from '@auth/application/port/out/credential-repository.port';
import { CryptoPort } from '@auth/application/port/in/crypto.port';
import { JwtPort } from '@auth/application/port/out/jwt.port';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';
import {
  CredentialNotFoundException,
  InvalidCredentialsException,
} from '@auth/domain/exceptions/auth-domain.exception';

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly credentialRepository: CredentialRepositoryPort,
    private readonly cryptoService: CryptoPort,
    private readonly jwtPort: JwtPort,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const credential = await this.credentialRepository.findByUserId(
      user.id!.toString(),
    );
    if (!credential) {
      throw new CredentialNotFoundException(user.id!.toString());
    }

    const passwordValid = await this.cryptoService.comparePasswords(
      command.password,
      credential.passwordHash.toString(),
    );
    if (!passwordValid) {
      throw new InvalidCredentialsException();
    }

    const token = this.jwtPort.sign({
      sub: user.id!.toString(),
      email: user.email.toString(),
    });

    return {
      accessToken: token.accessToken,
      userId: user.id!.toString(),
      email: user.email.toString(),
    };
  }
}
