import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseRepositoryPort } from '@cs2/case/application/ports/out/case-repository.port';
import { Case } from '@cs2/case/domain/models/case.model';
import { CaseOrmEntity } from '../entities/case-orm.entity';
import { CasePersistenceMapper } from '../mappers/case-persistence.mapper';

@Injectable()
export class TypeOrmCaseRepository implements CaseRepositoryPort {
  constructor(
    @InjectRepository(CaseOrmEntity)
    private readonly repository: Repository<CaseOrmEntity>,
  ) {}

  async create(entity: Case): Promise<Case> {
    const orm = CasePersistenceMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return CasePersistenceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Case | null> {
    const orm = await this.repository.findOne({ where: { id } });
    return orm ? CasePersistenceMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Case[]> {
    const entities = await this.repository.findBy({});
    return entities.map(CasePersistenceMapper.toDomain);
  }

  async update(id: string, entity: Case): Promise<Case> {
    const orm = CasePersistenceMapper.toOrm(entity);
    orm.id = id;
    const saved = await this.repository.save(orm);
    return CasePersistenceMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
