export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidTaskTitleException extends DomainException {
  constructor(title: string) {
    super(`Invalid task title: "${title}". Must be between 3 and 150 characters.`);
  }
}

export class InvalidTaskDescriptionException extends DomainException {
  constructor() {
    super('Task description must not exceed 500 characters.');
  }
}

export class InvalidTaskStatusTransitionException extends DomainException {
  constructor(from: string, to: string) {
    super(`Invalid status transition from "${from}" to "${to}".`);
  }
}

export class TaskNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Task with id "${id}" not found.`);
  }
}
