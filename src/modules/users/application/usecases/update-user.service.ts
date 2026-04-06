import { Injectable } from '@nestjs/common';
import {
  UpdateUserUseCase,
  UpdateUserCommand,
} from '@users/application/ports/in/update-user.port';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';
import { User } from '@users/domain/models/user.model';
import { UserNotFoundException } from '@users/domain/exceptions/user-domain.exception';

@Injectable()
export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string, command: UpdateUserCommand): Promise<User> {
    const existing = await this.userRepository.findById(id);
    if (!existing) {
      throw new UserNotFoundException(id);
    }

    let updated: User = existing;

    if (command.name !== undefined) {
      updated = updated.changeName(command.name);
    }
    if (command.lastName !== undefined) {
      updated = updated.changeLastName(command.lastName);
    }
    if (command.email !== undefined) {
      updated = updated.changeEmail(command.email);
    }

    await this.userRepository.update(updated);
    return updated;
  }
}
