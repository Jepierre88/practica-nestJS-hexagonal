import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialRepositoryPort } from '@auth/application/port/out/credential-repository.port';
import { Credential } from '@auth/domain/models/credential.model';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';
import { CredentialPersistenceMapper } from '@auth/infrastructure/adapters/out/persistence/typeorm/mappers/credential-persistence.mapper';

@Injectable()
export class TypeOrmCredentialRepository implements CredentialRepositoryPort {
  constructor(
    @InjectRepository(CredentialOrmEntity)
    private readonly ormRepo: Repository<CredentialOrmEntity>,
    private readonly mapper: CredentialPersistenceMapper,
  ) {}

  async save(credential: Credential): Promise<Credential> {
    const orm = this.mapper.toOrm(credential);
    const saved = await this.ormRepo.save(orm);
    return this.mapper.toDomain(saved);
  }

  async findByUserId(userId: string): Promise<Credential | null> {
    const row = await this.ormRepo.findOne({ where: { userId } });
    return row ? this.mapper.toDomain(row) : null;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.ormRepo.delete({ userId });
  }
}
