import { Injectable } from '@nestjs/common';
import { ManageCaseSkinsUseCase } from '../ports/in/manage-case-skins.port';
import { AddSkinToCaseCommand } from '../commands/add-skin-to-case.command';
import { RemoveSkinFromCaseCommand } from '../commands/remove-skin-from-case.command';
import { Case } from '../../domain/models/case.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { CaseNotFoundException } from '../../domain/exceptions/case.exception';
import { SkinRepositoryPort } from '@cs2/skin/application/ports/out/skin-repository.port';
import { CasePricingService } from '../../domain/services/case-pricing.service';
import { Skin } from '@cs2/skin/domain/models/skin.model';

@Injectable()
export class ManageCaseSkinsService implements ManageCaseSkinsUseCase {
  constructor(
    private readonly caseRepository: CaseRepositoryPort,
    private readonly skinRepository: SkinRepositoryPort,
  ) {}

  async addSkin(command: AddSkinToCaseCommand): Promise<Case> {
    const existing = await this.caseRepository.findById(command.caseId);
    if (!existing) {
      throw new CaseNotFoundException(command.caseId);
    }

    const skin = await this.skinRepository.findById(command.skinId);
    if (!skin) {
      throw new Error(`Skin "${command.skinId}" not found.`);
    }

    // Gather all skins including the new one
    const allSkins: Skin[] = [...existing.caseSkins.map((cs) => cs.skin), skin];

    // Recalculate drop rates for all skins
    const calculated = CasePricingService.calculateDropRates(
      existing.price,
      allSkins,
    );

    // Clear existing skins and re-add with new rates
    for (const cs of existing.caseSkins) {
      await this.caseRepository.removeSkin(command.caseId, cs.skin.id!);
    }
    for (const { skin: s, dropRate } of calculated) {
      await this.caseRepository.addSkin(command.caseId, s.id!, dropRate);
    }

    return (await this.caseRepository.findById(command.caseId))!;
  }

  async removeSkin(command: RemoveSkinFromCaseCommand): Promise<Case> {
    const existing = await this.caseRepository.findById(command.caseId);
    if (!existing) {
      throw new CaseNotFoundException(command.caseId);
    }

    await this.caseRepository.removeSkin(command.caseId, command.skinId);

    // Recalculate drop rates for remaining skins
    const remainingSkins = existing.caseSkins
      .filter((cs) => cs.skin.id !== command.skinId)
      .map((cs) => cs.skin);

    if (remainingSkins.length > 0) {
      const calculated = CasePricingService.calculateDropRates(
        existing.price,
        remainingSkins,
      );

      for (const cs of remainingSkins) {
        await this.caseRepository.removeSkin(command.caseId, cs.id!);
      }
      for (const { skin: s, dropRate } of calculated) {
        await this.caseRepository.addSkin(command.caseId, s.id!, dropRate);
      }
    }

    return (await this.caseRepository.findById(command.caseId))!;
  }
}
