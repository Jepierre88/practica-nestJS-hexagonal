import { User } from '@users/domain/models/user.model';

export abstract class UserRepositoryPort {
  abstract save(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
  abstract existsByEmail(email: string): Promise<boolean>;
}
