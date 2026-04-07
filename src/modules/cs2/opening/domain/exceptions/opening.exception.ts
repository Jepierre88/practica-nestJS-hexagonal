import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class OpeningNotFoundException extends DomainError {
  constructor(identifier: string) {
    super(`Opening "${identifier}" not found.`);
  }
}

export class OpeningAlreadyExistsException extends DomainError {
  constructor(identifier: string) {
    super(`Opening "${identifier}" already exists.`);
  }
}
