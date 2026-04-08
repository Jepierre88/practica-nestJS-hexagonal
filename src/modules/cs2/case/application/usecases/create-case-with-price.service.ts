import { Injectable } from '@nestjs/common';
import { CreateCaseWithPriceUseCase } from '../ports/in/create-case-with-price.port';
import { CreateCaseWithPriceCommand } from '../commands/create-case.command';
import { Case } from '../../domain/models/case.model';
import { CaseSkin } from '../../domain/models/case-skin.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { SkinRepositoryPort } from '@cs2/skin/application/ports/out/skin-repository.port';
import { CasePricingService } from '../../domain/services/case-pricing.service';
import { Skin } from '@cs2/skin/domain/models/skin.model';

@Injectable()
export class CreateCaseWithPriceService implements CreateCaseWithPriceUseCase {
  constructor(
    private readonly caseRepository: CaseRepositoryPort,
    private readonly skinRepository: SkinRepositoryPort,
  ) {}

  async execute(command: CreateCaseWithPriceCommand): Promise<Case> {
    const skins = await this.resolveSkins(command.skinIds);
    const calculated = CasePricingService.calculateDropRates(
      command.price,
      skins,
    );

    const caseSkins = calculated.map(({ skin, dropRate }) =>
      CaseSkin.create({ skin, dropRate }),
    );

    return this.caseRepository.create(
      Case.create({ name: command.name, price: command.price, caseSkins }),
    );
  }

  private async resolveSkins(skinIds: string[]): Promise<Skin[]> {
    const skins: Skin[] = [];
    for (const skinId of skinIds) {
      const skin = await this.skinRepository.findById(skinId);
      if (!skin) {
        throw new Error(`Skin "${skinId}" not found.`);
      }
      skins.push(skin);
    }
    return skins;
  }
}
