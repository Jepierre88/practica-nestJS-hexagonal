import { CreateUserCommand } from '@users/application/commands/create-user.command';
import { User } from '@users/domain/models/user.model';

export abstract class RegisterUserUseCase {
  abstract execute(command: CreateUserCommand): Promise<User>;
}
