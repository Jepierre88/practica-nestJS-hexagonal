import { Credential } from '@auth/domain/models/credential.model';
export abstract class CredentialRepositoryPort {
  abstract save(credential: Credential): Promise<Credential>;
  abstract findByUserId(userId: string): Promise<Credential | null>;
  abstract deleteByUserId(userId: string): Promise<void>;
}
