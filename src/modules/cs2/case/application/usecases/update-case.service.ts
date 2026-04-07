import { Injectable } from '@nestjs/common';
import { UpdateCaseUseCase } from '../ports/in/update-case.port';
import { UpdateCaseCommand } from '../commands/update-case.command';
import { Case } from '../../domain/models/case.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { CaseNotFoundException } from '../../domain/exceptions/case.exception';

@Injectable()
export class UpdateCaseService implements UpdateCaseUseCase {
  constructor(private readonly caseRepository: CaseRepositoryPort) {}

  async execute(command: UpdateCaseCommand): Promise<Case> {
    const existing = await this.caseRepository.findById(command.id);
    if (!existing) {
      throw new CaseNotFoundException(command.id);
    }
    return this.caseRepository.update(command.id, existing);
  }
}
