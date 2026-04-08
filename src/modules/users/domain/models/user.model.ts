import { UserId } from '@users/domain/value-objects/user-id.vo';
import { UserName } from '@users/domain/value-objects/user-name.vo';
import { UserEmail } from '@users/domain/value-objects/user-email.vo';
import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';
import { Subscription } from '@enterprise/domain/model/subscription.model';

export interface UserProps {
  readonly id?: UserId;
  readonly name: UserName;
  readonly lastName: UserName;
  readonly email: UserEmail;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly subscription?: Subscription;
}

export interface CreateUserProps {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly subscription?: Subscription;
}

export interface ReconstructUserProps {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly subscription?: Subscription;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface User extends DomainProps<UserProps> {}
export class User extends DomainModel<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  static create(input: CreateUserProps): User {
    return new User({
      name: UserName.create(input.name),
      lastName: UserName.create(input.lastName),
      email: UserEmail.create(input.email),
      subscription: input.subscription,
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
      subscription: input.subscription,
    });
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
    subscriptionId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.props.id?.toString(),
      name: this.props.name.toString(),
      lastName: this.props.lastName.toString(),
      email: this.props.email.toString(),
      subscriptionId: this.props.subscription?.toPrimitives().id,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
