import { Injectable } from '@nestjs/common';
import { CreateCaseWithRatesUseCase } from '../ports/in/create-case-with-rates.port';
import { CreateCaseWithRatesCommand } from '../commands/create-case.command';
import { Case } from '../../domain/models/case.model';
import { CaseSkin } from '../../domain/models/case-skin.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { SkinRepositoryPort } from '@cs2/skin/application/ports/out/skin-repository.port';
import { CasePricingService } from '../../domain/services/case-pricing.service';
import { Skin } from '@cs2/skin/domain/models/skin.model';

@Injectable()
export class CreateCaseWithRatesService implements CreateCaseWithRatesUseCase {
  constructor(
    private readonly caseRepository: CaseRepositoryPort,
    private readonly skinRepository: SkinRepositoryPort,
  ) {}

  async execute(command: CreateCaseWithRatesCommand): Promise<Case> {
    const skinIds = command.skins.map((s) => s.skinId);
    const skins = await this.resolveSkins(skinIds);

    const skinsWithRates = command.skins.map((input) => {
      const skin = skins.find((s) => s.id === input.skinId)!;
      return { skin, dropRate: input.dropRate };
    });

    const price = CasePricingService.calculatePrice(skinsWithRates);

    const caseSkins = skinsWithRates.map(({ skin, dropRate }) =>
      CaseSkin.create({ skin, dropRate }),
    );

    return this.caseRepository.create(
      Case.create({ name: command.name, price, caseSkins }),
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
