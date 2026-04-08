import { Skin } from '@cs2/skin/domain/models/skin.model';
import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

export interface CaseSkinProps {
  readonly skin: Skin;
  readonly dropRate: number;
}

export interface CaseSkin extends DomainProps<CaseSkinProps> {}
export class CaseSkin extends DomainModel<CaseSkinProps> {
  private constructor(props: CaseSkinProps) {
    super(props);
  }

  static create(props: CaseSkinProps): CaseSkin {
    if (props.dropRate < 0 || props.dropRate > 100) {
      throw new Error(
        `Drop rate must be between 0 and 100, got ${props.dropRate}`,
      );
    }
    return new CaseSkin(props);
  }

  toPrimitives() {
    return {
      skin: this.props.skin.toPrimitives(),
      dropRate: this.props.dropRate,
    };
  }
}
