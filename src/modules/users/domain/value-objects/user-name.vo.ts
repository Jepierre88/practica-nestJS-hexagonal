import { InvalidUserNameException } from '@users/domain/exceptions/user-domain.exception';

export class UserName {
  private static readonly MIN_LENGTH = 2;
  private static readonly MAX_LENGTH = 100;

  private constructor(private readonly value: string) {}

  static create(name: string): UserName {
    const trimmed = name?.trim();
    if (
      !trimmed ||
      trimmed.length < UserName.MIN_LENGTH ||
      trimmed.length > UserName.MAX_LENGTH
    ) {
      throw new InvalidUserNameException(name);
    }
    return new UserName(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }
}
