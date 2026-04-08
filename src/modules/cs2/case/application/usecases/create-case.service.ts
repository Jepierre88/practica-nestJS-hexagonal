import { Injectable } from '@nestjs/common';
import { CreateCaseUseCase } from '../ports/in/create-case.port';
import { CreateCaseCommand } from '../commands/create-case.command';
import { Case } from '../../domain/models/case.model';
import { CaseSkin } from '../../domain/models/case-skin.model';
import { CaseRepositoryPort } from '../ports/out/case-repository.port';
import { SkinRepositoryPort } from '@cs2/skin/application/ports/out/skin-repository.port';
import { CasePricingService } from '../../domain/services/case-pricing.service';
import { Skin } from '@cs2/skin/domain/models/skin.model';

@Injectable()
export class CreateCaseService implements CreateCaseUseCase {
  constructor(
    private readonly caseRepository: CaseRepositoryPort,
    private readonly skinRepository: SkinRepositoryPort,
  ) {}

  async execute(command: CreateCaseCommand): Promise<Case> {
    if (command.mode === 'price') {
      return this.createWithPrice(command);
    }

    return this.createWithRates(command);
  }

  private async createWithPrice(props: {
    name: string;
    price: number;
    skinIds: string[];
  }): Promise<Case> {
    const skins = await this.resolveSkins(props.skinIds);
    const calculated = CasePricingService.calculateDropRates(
      props.price,
      skins,
    );

    const caseSkins = calculated.map(({ skin, dropRate }) =>
      CaseSkin.create({ skin, dropRate }),
    );

    return this.caseRepository.create(
      Case.create({ name: props.name, price: props.price, caseSkins }),
    );
  }

  private async createWithRates(props: {
    name: string;
    skins: { skinId: string; dropRate: number }[];
  }): Promise<Case> {
    const skinIds = props.skins.map((s) => s.skinId);
    const skins = await this.resolveSkins(skinIds);

    const skinsWithRates = props.skins.map((input) => {
      const skin = skins.find((s) => s.id === input.skinId)!;
      return { skin, dropRate: input.dropRate };
    });

    const price = CasePricingService.calculatePrice(skinsWithRates);

    const caseSkins = skinsWithRates.map(({ skin, dropRate }) =>
      CaseSkin.create({ skin, dropRate }),
    );

    return this.caseRepository.create(
      Case.create({ name: props.name, price, caseSkins }),
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
