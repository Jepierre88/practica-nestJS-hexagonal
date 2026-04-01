import { DomainError } from "@shared/domain/exceptions/domain-error.exception";

export class InvalidProgramLanguajeIdException extends DomainError {
  constructor(id: string) {
    super(`Invalid program languaje id: "${id}".`);
  }
}

export class NotFoundProgramLanguajeException extends DomainError {
  constructor(identifier: string) {
    super(`Program languaje "${identifier}" not found.`);
  }
}

export class ProgramLanguajeAlreadyExistsException extends DomainError {
  constructor(name: string) {
    super(`Program languaje with name "${name}" already exists.`);
  }
}