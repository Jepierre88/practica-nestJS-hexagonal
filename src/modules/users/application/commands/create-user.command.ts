export interface CreateUserCommandProps {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}

export class CreateUserCommand {
  private constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(props: CreateUserCommandProps): CreateUserCommand {
    return new CreateUserCommand(props.name, props.lastName, props.email, props.password);
  }
}