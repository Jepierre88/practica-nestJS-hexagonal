import { Injectable } from '@nestjs/common';
import { FindUsersUseCase } from '@users/application/ports/in/find-users.port';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';
import { User } from '@users/domain/models/user.model';
import { UserNotFoundException } from '@users/domain/exceptions/user-domain.exception';

@Injectable()
export class FindUsersService implements FindUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }
}
