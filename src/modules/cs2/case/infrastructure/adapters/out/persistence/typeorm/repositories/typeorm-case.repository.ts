import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseRepositoryPort } from '@cs2/case/application/ports/out/case-repository.port';
import { Case } from '@cs2/case/domain/models/case.model';
import { CaseOrmEntity } from '../entities/case-orm.entity';
import { CaseSkinOrmEntity } from '../entities/case-skin-orm.entity';
import { CasePersistenceMapper } from '../mappers/case-persistence.mapper';

@Injectable()
export class TypeOrmCaseRepository implements CaseRepositoryPort {
  private readonly mapper = new CasePersistenceMapper();

  constructor(
    @InjectRepository(CaseOrmEntity)
    private readonly repository: Repository<CaseOrmEntity>,
    @InjectRepository(CaseSkinOrmEntity)
    private readonly caseSkinRepository: Repository<CaseSkinOrmEntity>,
  ) {}

  async create(entity: Case): Promise<Case> {
    const orm = this.mapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return this.findById(saved.id) as Promise<Case>;
  }

  async findById(id: string): Promise<Case | null> {
    const orm = await this.repository.findOne({
      where: { id },
      relations: ['caseSkins', 'caseSkins.skin', 'caseSkins.skin.weapon', 'caseSkins.skin.collection'],
    });
    return orm ? this.mapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Case[]> {
    const entities = await this.repository.find({
      relations: ['caseSkins', 'caseSkins.skin', 'caseSkins.skin.weapon', 'caseSkins.skin.collection'],
    });
    return entities.map((orm) => this.mapper.toDomain(orm));
  }

  async update(id: string, entity: Case): Promise<Case> {
    const orm = this.mapper.toOrm(entity);
    orm.id = id;
    await this.repository.save(orm);
    return this.findById(id) as Promise<Case>;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async addSkin(caseId: string, skinId: string, dropRate: number): Promise<void> {
    const caseSkin = new CaseSkinOrmEntity();
    caseSkin.caseId = caseId;
    caseSkin.skinId = skinId;
    caseSkin.dropRate = dropRate;
    await this.caseSkinRepository.save(caseSkin);
  }

  async removeSkin(caseId: string, skinId: string): Promise<void> {
    await this.caseSkinRepository.delete({ caseId, skinId });
  }
}
