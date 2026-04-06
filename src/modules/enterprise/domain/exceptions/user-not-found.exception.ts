import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class UserNotFoundException extends DomainError {
  constructor(id: string) {
    super(`User with id "${id}" not found.`);
  }
}
