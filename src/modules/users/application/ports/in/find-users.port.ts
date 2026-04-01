import { User } from '@users/domain/models/user.model';

export abstract class FindUsersUseCase {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
}
