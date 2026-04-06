import { Injectable } from '@nestjs/common';
import { RegisterUserUseCase } from '@users/application/ports/in/register-user.port';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';
import { CredentialRepositoryPort } from '@auth/application/port/out/credential-repository.port';
import { User } from '@users/domain/models/user.model';
import { Credential } from '@auth/domain/models/credential.model';
import { UserAlreadyExistsException } from '@users/domain/exceptions/user-domain.exception';
import { CryptoPort } from '@auth/application/port/in/crypto.port';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserSubscriptionRepositoryPort } from '@enterprise/application/ports/out/user-subscription-repository.port';

@Injectable()
export class RegisterUserService implements RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly credentialRepository: CredentialRepositoryPort,
    private readonly userSubscriptionRepository: UserSubscriptionRepositoryPort,
    private readonly cryptoService: CryptoPort,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const exists = await this.userRepository.existsByEmail(command.email);
    if (exists) {
      throw new UserAlreadyExistsException(command.email);
    }

    const user = User.create({
      name: command.name,
      lastName: command.lastName,
      email: command.email,
    });

    const savedUser = await this.userRepository.save(user);

    const passwordHash = await this.cryptoService.hashPassword(
      command.password,
    );
    const credential = Credential.create({
      userId: savedUser.id!.toString(),
      passwordHash,
    });

    await this.credentialRepository.save(credential);
    await this.userSubscriptionRepository.assignDefaultSubscription(
      savedUser.id!.toString(),
    );
    return savedUser;
  }
}
