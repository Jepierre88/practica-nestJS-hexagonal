import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class WeaponNotFoundException extends DomainError {
  constructor(identifier: string) {
    super(`Weapon "${identifier}" not found.`);
  }
}

export class WeaponAlreadyExistsException extends DomainError {
  constructor(identifier: string) {
    super(`Weapon "${identifier}" already exists.`);
  }
}
