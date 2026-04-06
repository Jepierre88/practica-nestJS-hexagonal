import { Injectable } from '@nestjs/common';
import { DeleteUserUseCase } from '@users/application/ports/in/delete-user.port';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';
import { CredentialRepositoryPort } from '@auth/application/port/out/credential-repository.port';
import { UserNotFoundException } from '@users/domain/exceptions/user-domain.exception';

@Injectable()
export class DeleteUserService implements DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly credentialRepository: CredentialRepositoryPort,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }

    await this.credentialRepository.deleteByUserId(id);
    await this.userRepository.deleteById(id);
  }
}
