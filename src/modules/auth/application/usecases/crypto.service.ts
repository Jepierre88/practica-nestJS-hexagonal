import { Injectable } from "@nestjs/common";
import { CryptoPort } from '@auth/application/port/in/crypto.port.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService implements CryptoPort {
  private static readonly SALT_ROUNDS = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, CryptoService.SALT_ROUNDS);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}