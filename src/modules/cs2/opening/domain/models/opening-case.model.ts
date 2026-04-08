import { Case } from '@cs2/case/domain/models/case.model';
import { Skin } from '@cs2/skin/domain/models/skin.model';
import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

export interface OpeningCaseProps {
  readonly case: Case;
  readonly resultSkin: Skin;
}

export interface OpeningCase extends DomainProps<OpeningCaseProps> {}
export class OpeningCase extends DomainModel<OpeningCaseProps> {
  private constructor(props: OpeningCaseProps) {
    super(props);
  }

  static create(props: OpeningCaseProps): OpeningCase {
    return new OpeningCase(props);
  }

  toPrimitives() {
    return {
      case: this.props.case.toPrimitives(),
      resultSkin: this.props.resultSkin.toPrimitives(),
    };
  }
}
