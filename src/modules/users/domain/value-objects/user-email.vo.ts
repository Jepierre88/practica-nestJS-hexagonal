import { InvalidUserEmailException } from '@users/domain/exceptions/user-domain.exception';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserEmail {
  private constructor(private readonly value: string) {}

  static create(email: string): UserEmail {
    const trimmed = email?.trim().toLowerCase();
    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      throw new InvalidUserEmailException(email);
    }
    return new UserEmail(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }
}
