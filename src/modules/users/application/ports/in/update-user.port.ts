import { User } from '@users/domain/models/user.model';

export interface UpdateUserCommand {
  readonly name?: string;
  readonly lastName?: string;
  readonly email?: string;
}

export abstract class UpdateUserUseCase {
  abstract execute(id: string, command: UpdateUserCommand): Promise<User>;
}
