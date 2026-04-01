export interface LoginCommand {
  readonly email: string;
  readonly password: string;
}

export interface LoginResult {
  readonly accessToken: string;
  readonly userId: string;
  readonly email: string;
}

export abstract class LoginUseCase {
  abstract execute(command: LoginCommand): Promise<LoginResult>;
}
