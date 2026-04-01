export interface JwtPayload {
  readonly sub: string;
  readonly email: string;
}

export interface TokenResult {
  readonly accessToken: string;
}

export abstract class JwtPort {
  abstract sign(payload: JwtPayload): TokenResult;
  abstract verify(token: string): JwtPayload;
}
