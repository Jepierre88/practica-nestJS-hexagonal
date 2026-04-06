import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class InvalidUserIdException extends DomainError {
  constructor(id: string) {
    super(`Invalid user id: "${id}".`);
  }
}

export class InvalidUserNameException extends DomainError {
  constructor(name: string) {
    super(
      `Invalid user name: "${name}". Must be between 2 and 100 characters.`,
    );
  }
}

export class InvalidUserEmailException extends DomainError {
  constructor(email: string) {
    super(`Invalid email: "${email}".`);
  }
}

export class UserNotFoundException extends DomainError {
  constructor(identifier: string) {
    super(`User "${identifier}" not found.`);
  }
}

export class UserAlreadyExistsException extends DomainError {
  constructor(email: string) {
    super(`User with email "${email}" already exists.`);
  }
}
