import { Skin } from '@cs2/skin/domain/models/skin.model';

export interface CalculatedCaseSkin {
  readonly skin: Skin;
  readonly dropRate: number;
}

export class CasePricingService {
  /**
   * Mode 1: Given a case price and skins, calculate drop rates.
   * More expensive skins relative to case price = lower drop rate.
   * Uses inverse-price weighting: cheaper skins are more likely to drop.
   */
  static calculateDropRates(casePrice: number, skins: Skin[]): CalculatedCaseSkin[] {
    if (skins.length === 0) return [];

    // Inverse weight: cheaper skins get higher weight (more likely to drop)
    const inverseWeights = skins.map((skin) => {
      const ratio = skin.price / casePrice;
      // The higher the ratio (skin more expensive than case), the lower the weight
      return 1 / Math.max(ratio, 0.01);
    });

    const totalWeight = inverseWeights.reduce((sum, w) => sum + w, 0);

    return skins.map((skin, i) => ({
      skin,
      dropRate: Math.round((inverseWeights[i] / totalWeight) * 10000) / 100,
    }));
  }

  /**
   * Mode 2: Given skins with drop rates, calculate a fair case price.
   * Price = weighted average of skin prices by their drop rates,
   * with a house margin applied.
   */
  static calculatePrice(
    skinsWithRates: { skin: Skin; dropRate: number }[],
    houseMargin: number = 0.3,
  ): number {
    if (skinsWithRates.length === 0) return 0;

    const expectedValue = skinsWithRates.reduce(
      (sum, { skin, dropRate }) => sum + skin.price * (dropRate / 100),
      0,
    );

    // Case price = expected value * (1 - margin)
    // So the house keeps ~30% on average
    const price = expectedValue * (1 - houseMargin);

    return Math.round(price * 100) / 100;
  }
}
