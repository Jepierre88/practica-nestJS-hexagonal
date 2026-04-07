import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class SkinNotFoundException extends DomainError {
  constructor(identifier: string) {
    super(`Skin "${identifier}" not found.`);
  }
}

export class SkinAlreadyExistsException extends DomainError {
  constructor(identifier: string) {
    super(`Skin "${identifier}" already exists.`);
  }
}
