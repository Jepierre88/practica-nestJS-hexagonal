import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class CaseNotFoundException extends DomainError {
  constructor(identifier: string) {
    super(`Case "${identifier}" not found.`);
  }
}

export class CaseAlreadyExistsException extends DomainError {
  constructor(identifier: string) {
    super(`Case "${identifier}" already exists.`);
  }
}
