import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

export class NotFoundSubscriptionException extends DomainError {
  constructor(id: string) {
    super(`Subscription with id "${id}" not found.`);
  }
}

export class SubscriptionAlreadyExistsException extends DomainError {
  constructor(id: string) {
    super(`Subscription with id "${id}" already exists.`);
  }
}

export class InvalidSubscriptionStatusTransitionException extends DomainError {
  constructor(from: string, to: string) {
    super(`Cannot transition subscription status from "${from}" to "${to}".`);
  }
}

export class ExpiredSubscriptionException extends DomainError {
  constructor(id: string) {
    super(`Subscription with id "${id}" has expired.`);
  }
}

export class InvalidSubscriptionPlanException extends DomainError {
  constructor(plan: string) {
    super(`Invalid subscription plan: "${plan}".`);
  }
}
