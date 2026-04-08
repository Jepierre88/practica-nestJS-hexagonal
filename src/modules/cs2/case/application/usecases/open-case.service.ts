import { Injectable } from '@nestjs/common';
import { OpenCaseUseCase } from '../ports/in/open-case.port';
import { CaseOpenResult } from '../commands/open-case-result';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { OpeningRepositoryPort } from '@cs2/opening/application/ports/out/opening-repository.port';
import { CaseOpeningService } from '../../domain/services/case-opening.service';
import { Opening } from '@cs2/opening/domain/models/opening.model';

@Injectable()
export class OpenCaseService implements OpenCaseUseCase {
  constructor(
    private readonly caseRepository: CaseRepositoryPort,
    private readonly openingRepository: OpeningRepositoryPort,
  ) {}

  async execute(caseId: string): Promise<CaseOpenResult> {
    const caseEntity = await this.caseRepository.findById(caseId);
    if (!caseEntity) {
      throw new Error(`Case "${caseId}" not found.`);
    }

    if (caseEntity.caseSkins.length === 0) {
      throw new Error(`Case "${caseEntity.name}" has no skins to open.`);
    }

    const { winnerSkin, winnerIndex } = CaseOpeningService.open(
      caseEntity.caseSkins,
    );

    // Create an opening record with the result
    const opening = Opening.create({
      name: `${caseEntity.name} Opening`,
    });

    const savedOpening = await this.openingRepository.create(opening);

    await this.openingRepository.addCase(
      savedOpening.id!,
      caseId,
      winnerSkin.skin.id!,
    );

    return {
      case_: caseEntity,
      winnerSkin,
      winnerIndex,
      openingId: savedOpening.id!,
    };
  }
}
