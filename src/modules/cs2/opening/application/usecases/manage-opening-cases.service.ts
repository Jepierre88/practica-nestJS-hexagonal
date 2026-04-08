import { Injectable } from '@nestjs/common';
import { ManageOpeningCasesUseCase } from '../ports/in/manage-opening-cases.port';
import { AddCaseToOpeningCommand } from '../commands/add-case-to-opening.command';
import { RemoveCaseFromOpeningCommand } from '../commands/remove-case-from-opening.command';
import { Opening } from '../../domain/models/opening.model';
import { OpeningRepositoryPort } from '../ports/out/opening-repository.port';
import { OpeningNotFoundException } from '../../domain/exceptions/opening.exception';
import { CaseRepositoryPort } from '@cs2/case/application/ports/out/case-repository.port';
import { SkinRepositoryPort } from '@cs2/skin/application/ports/out/skin-repository.port';

@Injectable()
export class ManageOpeningCasesService implements ManageOpeningCasesUseCase {
  constructor(
    private readonly openingRepository: OpeningRepositoryPort,
    private readonly caseRepository: CaseRepositoryPort,
    private readonly skinRepository: SkinRepositoryPort,
  ) {}

  async addCase(command: AddCaseToOpeningCommand): Promise<Opening> {
    const opening = await this.openingRepository.findById(command.openingId);
    if (!opening) {
      throw new OpeningNotFoundException(command.openingId);
    }

    const caseEntity = await this.caseRepository.findById(command.caseId);
    if (!caseEntity) {
      throw new Error(`Case "${command.caseId}" not found.`);
    }

    const skin = await this.skinRepository.findById(command.resultSkinId);
    if (!skin) {
      throw new Error(`Skin "${command.resultSkinId}" not found.`);
    }

    await this.openingRepository.addCase(
      command.openingId,
      command.caseId,
      command.resultSkinId,
    );
    return (await this.openingRepository.findById(command.openingId))!;
  }

  async removeCase(command: RemoveCaseFromOpeningCommand): Promise<Opening> {
    const opening = await this.openingRepository.findById(command.openingId);
    if (!opening) {
      throw new OpeningNotFoundException(command.openingId);
    }

    await this.openingRepository.removeCase(command.openingId, command.caseId);
    return (await this.openingRepository.findById(command.openingId))!;
  }
}
