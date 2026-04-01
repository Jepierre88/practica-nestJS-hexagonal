import { UserId } from '@users/domain/value-objects/user-id.vo';
import { UserName } from '@users/domain/value-objects/user-name.vo';
import { UserEmail } from '@users/domain/value-objects/user-email.vo';
import { DomainModel } from '@shared/domain/models/domain.model';

export interface UserProps {
  readonly id?: UserId;
  readonly name: UserName;
  readonly lastName: UserName;
  readonly email: UserEmail;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateUserProps {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
}

export interface ReconstructUserProps {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class User extends DomainModel {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    super();
    this.props = props;
  }

  static create(input: CreateUserProps): User {
    return new User({
      name: UserName.create(input.name),
      lastName: UserName.create(input.lastName),
      email: UserEmail.create(input.email),
    });
  }

  static reconstruct(input: ReconstructUserProps): User {
    return new User({
      id: UserId.fromString(input.id),
      name: UserName.create(input.name),
      lastName: UserName.create(input.lastName),
      email: UserEmail.create(input.email),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }

  // ─── Getters ──────────────────────────────────────────────

  get id(): UserId | undefined {
    return this.props.id;
  }

  get name(): UserName {
    return this.props.name;
  }

  get lastName(): UserName {
    return this.props.lastName;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  // ─── Comportamiento ──────────────────────────────────────

  changeName(name: string): User {
    return new User({
      ...this.props,
      name: UserName.create(name),
    });
  }

  changeLastName(lastName: string): User {
    return new User({
      ...this.props,
      lastName: UserName.create(lastName),
    });
  }

  changeEmail(email: string): User {
    return new User({
      ...this.props,
      email: UserEmail.create(email),
    });
  }

  // ─── Serialización ────────────────────────────────────────

  toPrimitives(): {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.props.id?.toString(),
      name: this.props.name.toString(),
      lastName: this.props.lastName.toString(),
      email: this.props.email.toString(),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
