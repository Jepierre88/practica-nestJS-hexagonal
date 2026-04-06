import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JwtPayload,
  JwtPort,
  TokenResult,
} from '@auth/application/port/out/jwt.port';

@Injectable()
export class JwtAdapterService implements JwtPort {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: JwtPayload): TokenResult {
    return {
      accessToken: this.jwtService.sign({
        sub: payload.sub,
        email: payload.email,
      }),
    };
  }

  verify(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token);
  }
}
