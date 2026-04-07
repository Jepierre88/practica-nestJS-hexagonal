import { Injectable } from '@nestjs/common';
import { DeleteCaseUseCase } from '../ports/in/delete-case.port';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { CaseNotFoundException } from '../../domain/exceptions/case.exception';

@Injectable()
export class DeleteCaseService implements DeleteCaseUseCase {
  constructor(private readonly caseRepository: CaseRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const existing = await this.caseRepository.findById(id);
    if (!existing) {
      throw new CaseNotFoundException(id);
    }
    await this.caseRepository.delete(id);
  }
}
