export abstract class UserDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidUserIdException extends UserDomainException {
  constructor(id: string) {
    super(`Invalid user id: "${id}".`);
  }
}

export class InvalidUserNameException extends UserDomainException {
  constructor(name: string) {
    super(`Invalid user name: "${name}". Must be between 2 and 100 characters.`);
  }
}

export class InvalidUserEmailException extends UserDomainException {
  constructor(email: string) {
    super(`Invalid email: "${email}".`);
  }
}

export class UserNotFoundException extends UserDomainException {
  constructor(identifier: string) {
    super(`User "${identifier}" not found.`);
  }
}

export class UserAlreadyExistsException extends UserDomainException {
  constructor(email: string) {
    super(`User with email "${email}" already exists.`);
  }
}
