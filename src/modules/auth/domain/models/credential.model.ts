import { CredentialId } from '@auth/domain/value-objects/credential-id.vo';
import { PasswordHash } from '@auth/domain/value-objects/password-hash.vo';
import { DomainModel } from '@shared/domain/models/domain.model';

export interface CredentialProps {
  readonly id?: CredentialId;
  readonly userId: string;
  readonly passwordHash: PasswordHash;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateCredentialProps {
  readonly userId: string;
  readonly passwordHash: string;
}

export interface ReconstructCredentialProps {
  readonly id: string;
  readonly userId: string;
  readonly passwordHash: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class Credential extends DomainModel {
  private readonly props: CredentialProps;

  private constructor(props: CredentialProps) {
    super();
    this.props = props;
  }

  static create(input: CreateCredentialProps): Credential {
    return new Credential({
      userId: input.userId,
      passwordHash: PasswordHash.create(input.passwordHash),
    });
  }

  static reconstruct(input: ReconstructCredentialProps): Credential {
    return new Credential({
      id: CredentialId.fromString(input.id),
      userId: input.userId,
      passwordHash: PasswordHash.create(input.passwordHash),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }

  // ─── Getters ──────────────────────────────────────────────

  get id(): CredentialId | undefined {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get passwordHash(): PasswordHash {
    return this.props.passwordHash;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  // ─── Serialización ────────────────────────────────────────

  toPrimitives(): {
    id?: string;
    userId: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.props.id?.toString(),
      userId: this.props.userId,
      passwordHash: this.props.passwordHash.toString(),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}