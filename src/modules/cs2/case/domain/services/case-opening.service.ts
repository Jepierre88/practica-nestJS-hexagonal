import { CaseSkin } from '../models/case-skin.model';

export interface OpeningResult {
  readonly winnerSkin: CaseSkin;
  readonly winnerIndex: number;
}

export class CaseOpeningService {
  /**
   * Selects a random skin from the case using weighted random
   * based on each skin's drop rate.
   */
  static open(caseSkins: CaseSkin[]): OpeningResult {
    if (caseSkins.length === 0) {
      throw new Error('Cannot open a case with no skins');
    }

    const totalWeight = caseSkins.reduce((sum, cs) => sum + cs.dropRate, 0);
    const random = Math.random() * totalWeight;

    let cumulative = 0;
    for (let i = 0; i < caseSkins.length; i++) {
      cumulative += caseSkins[i].toPrimitives().dropRate;
      if (random <= cumulative) {
        return { winnerSkin: caseSkins[i], winnerIndex: i };
      }
    }

    // Fallback to last skin (floating point edge case)
    return {
      winnerSkin: caseSkins[caseSkins.length - 1],
      winnerIndex: caseSkins.length - 1,
    };
  }
}
