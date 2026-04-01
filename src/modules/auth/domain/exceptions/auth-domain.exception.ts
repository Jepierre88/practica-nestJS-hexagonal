export abstract class AuthDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidPasswordHashException extends AuthDomainException {
  constructor() {
    super('Password hash cannot be empty.');
  }
}

export class InvalidCredentialIdException extends AuthDomainException {
  constructor(id: string) {
    super(`Invalid credential id: "${id}".`);
  }
}

export class CredentialNotFoundException extends AuthDomainException {
  constructor(userId: string) {
    super(`Credential for user "${userId}" not found.`);
  }
}

export class InvalidCredentialsException extends AuthDomainException {
  constructor() {
    super('Invalid email or password.');
  }
}
