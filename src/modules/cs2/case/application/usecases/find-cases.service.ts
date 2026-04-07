import { Injectable } from '@nestjs/common';
import { FindCasesUseCase } from '../ports/in/find-cases.port';
import { Case } from '../../domain/models/case.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { CaseNotFoundException } from '../../domain/exceptions/case.exception';

@Injectable()
export class FindCasesService implements FindCasesUseCase {
  constructor(private readonly caseRepository: CaseRepositoryPort) {}

  async findAll(): Promise<Case[]> {
    return this.caseRepository.findAll();
  }

  async findById(id: string): Promise<Case> {
    const entity = await this.caseRepository.findById(id);
    if (!entity) {
      throw new CaseNotFoundException(id);
    }
    return entity;
  }
}
