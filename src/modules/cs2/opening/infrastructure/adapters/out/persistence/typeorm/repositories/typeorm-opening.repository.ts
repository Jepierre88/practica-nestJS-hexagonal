import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpeningRepositoryPort } from '@cs2/opening/application/ports/out/opening-repository.port';
import { Opening } from '@cs2/opening/domain/models/opening.model';
import { OpeningOrmEntity } from '../entities/opening-orm.entity';
import { OpeningCaseOrmEntity } from '../entities/opening-case-orm.entity';
import { OpeningPersistenceMapper } from '../mappers/opening-persistence.mapper';

const OPENING_RELATIONS = [
  'openingCases',
  'openingCases.case',
  'openingCases.case.caseSkins',
  'openingCases.case.caseSkins.skin',
  'openingCases.case.caseSkins.skin.weapon',
  'openingCases.case.caseSkins.skin.collection',
  'openingCases.resultSkin',
  'openingCases.resultSkin.weapon',
  'openingCases.resultSkin.collection',
];

@Injectable()
export class TypeOrmOpeningRepository implements OpeningRepositoryPort {
  private readonly mapper = new OpeningPersistenceMapper();

  constructor(
    @InjectRepository(OpeningOrmEntity)
    private readonly repository: Repository<OpeningOrmEntity>,
    @InjectRepository(OpeningCaseOrmEntity)
    private readonly openingCaseRepository: Repository<OpeningCaseOrmEntity>,
  ) {}

  async create(entity: Opening): Promise<Opening> {
    const orm = this.mapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return this.findById(saved.id) as Promise<Opening>;
  }

  async findById(id: string): Promise<Opening | null> {
    const orm = await this.repository.findOne({
      where: { id },
      relations: OPENING_RELATIONS,
    });
    return orm ? this.mapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Opening[]> {
    const entities = await this.repository.find({
      relations: OPENING_RELATIONS,
    });
    return entities.map((orm) => this.mapper.toDomain(orm));
  }

  async update(id: string, entity: Opening): Promise<Opening> {
    const orm = this.mapper.toOrm(entity);
    orm.id = id;
    await this.repository.save(orm);
    return this.findById(id) as Promise<Opening>;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async addCase(
    openingId: string,
    caseId: string,
    resultSkinId: string,
  ): Promise<void> {
    const oc = new OpeningCaseOrmEntity();
    oc.openingId = openingId;
    oc.caseId = caseId;
    oc.resultSkinId = resultSkinId;
    await this.openingCaseRepository.save(oc);
  }

  async removeCase(openingId: string, caseId: string): Promise<void> {
    await this.openingCaseRepository.delete({ openingId, caseId });
  }
}
