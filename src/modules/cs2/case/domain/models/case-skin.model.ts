import { Skin } from '@cs2/skin/domain/models/skin.model';
import { DomainModel } from '@shared/domain/models/domain.model';

export interface CaseSkinProps {
  readonly skin: Skin;
  readonly dropRate: number;
}

export class CaseSkin extends DomainModel {
  private constructor(
    public readonly skin: Skin,
    public readonly dropRate: number,
  ) {
    super();
  }

  static create(props: CaseSkinProps): CaseSkin {
    if (props.dropRate < 0 || props.dropRate > 100) {
      throw new Error(`Drop rate must be between 0 and 100, got ${props.dropRate}`);
    }
    return new CaseSkin(props.skin, props.dropRate);
  }

  toPrimitives() {
    return {
      skin: this.skin.toPrimitives(),
      dropRate: this.dropRate,
    };
  }
}
