import { Case } from '@cs2/case/domain/models/case.model';
import { Skin } from '@cs2/skin/domain/models/skin.model';
import { DomainModel } from '@shared/domain/models/domain.model';

export interface OpeningCaseProps {
  readonly case: Case;
  readonly resultSkin: Skin;
}

export class OpeningCase extends DomainModel {
  private constructor(
    public readonly case_: Case,
    public readonly resultSkin: Skin,
  ) {
    super();
  }

  static create(props: OpeningCaseProps): OpeningCase {
    return new OpeningCase(props.case, props.resultSkin);
  }

  toPrimitives() {
    return {
      case: this.case_.toPrimitives(),
      resultSkin: this.resultSkin.toPrimitives(),
    };
  }
}
