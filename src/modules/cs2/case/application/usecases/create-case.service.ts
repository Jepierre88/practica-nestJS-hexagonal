import { Injectable } from '@nestjs/common';
import { CreateCaseUseCase } from '../ports/in/create-case.port';
import { CreateCaseCommand } from '../commands/create-case.command';
import { Case } from '../../domain/models/case.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';

@Injectable()
export class CreateCaseService implements CreateCaseUseCase {
  constructor(private readonly caseRepository: CaseRepositoryPort) {}

  async execute(command: CreateCaseCommand): Promise<Case> {
    const entity = Case.create({ name: command.name });
    return this.caseRepository.create(entity);
  }
}
