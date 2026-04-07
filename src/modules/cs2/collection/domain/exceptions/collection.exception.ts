import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class CollectionNotFoundException extends DomainError {
  constructor(identifier: string) {
    super(`Collection "${identifier}" not found.`);
  }
}

export class CollectionAlreadyExistsException extends DomainError {
  constructor(identifier: string) {
    super(`Collection "${identifier}" already exists.`);
  }
}
