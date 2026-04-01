import { randomUUID } from 'node:crypto';
import { InvalidUserIdException } from '@users/domain/exceptions/user-domain.exception';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class UserId {
  private constructor(private readonly value: string) {}

  static create(): UserId {
    return new UserId(randomUUID());
  }

  static fromString(id: string): UserId {
    if (!UUID_REGEX.test(id)) {
      throw new InvalidUserIdException(id);
    }
    return new UserId(id);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
