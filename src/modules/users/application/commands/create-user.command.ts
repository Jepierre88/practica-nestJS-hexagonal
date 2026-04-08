export interface CreateUserCommand {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}
