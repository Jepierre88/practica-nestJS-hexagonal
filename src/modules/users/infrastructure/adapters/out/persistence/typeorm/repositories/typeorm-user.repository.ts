import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from '@users/application/ports/out/user-repository.port';
import { User } from '@users/domain/models/user.model';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { UserPersistenceMapper } from '@users/infrastructure/adapters/out/persistence/typeorm/mappers/user-persistence.mapper';

@Injectable()
export class TypeOrmUserRepository extends UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
    private readonly mapper: UserPersistenceMapper,
  ) {
    super();
  }

  async save(user: User): Promise<User> {
    const orm = this.mapper.toOrm(user);
    const saved = await this.ormRepo.save(orm);
    return this.mapper.toDomain(saved);
  }

  async findAll(): Promise<User[]> {
    const rows = await this.ormRepo.find({ order: { createdAt: 'DESC' } });
    return rows.map((e) => this.mapper.toDomain(e));
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.ormRepo.findOne({ where: { id } });
    return row ? this.mapper.toDomain(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.ormRepo.findOne({ where: { email } });
    return row ? this.mapper.toDomain(row) : null;
  }

  async update(user: User): Promise<void> {
    const orm = this.mapper.toOrm(user);
    await this.ormRepo.save(orm);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.ormRepo.existsBy({ email });
  }
}
