import { InvalidPasswordHashException } from '@auth/domain/exceptions/auth-domain.exception';

export class PasswordHash {
  private constructor(private readonly value: string) {}

  static create(hash: string): PasswordHash {
    if (!hash || hash.trim().length === 0) {
      throw new InvalidPasswordHashException();
    }
    return new PasswordHash(hash);
  }

  toString(): string {
    return this.value;
  }

  equals(other: PasswordHash): boolean {
    return this.value === other.value;
  }
}
