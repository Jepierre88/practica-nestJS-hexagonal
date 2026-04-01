import { randomUUID } from 'node:crypto';
import { InvalidCredentialIdException } from '@auth/domain/exceptions/auth-domain.exception';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class CredentialId {
  private constructor(private readonly value: string) {}

  static create(): CredentialId {
    return new CredentialId(randomUUID());
  }

  static fromString(id: string): CredentialId {
    if (!UUID_REGEX.test(id)) {
      throw new InvalidCredentialIdException(id);
    }
    return new CredentialId(id);
  }

  toString(): string {
    return this.value;
  }

  equals(other: CredentialId): boolean {
    return this.value === other.value;
  }
}
