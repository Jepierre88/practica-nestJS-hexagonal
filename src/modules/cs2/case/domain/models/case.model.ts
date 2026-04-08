import { CaseSkin } from './case-skin.model';
import { DomainModel } from '@shared/domain/models/domain.model';

export interface CaseProps {
  readonly id?: string;
  readonly name: string;
  readonly price: number;
  readonly caseSkins: CaseSkin[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateCaseProps {
  readonly name: string;
  readonly price: number;
  readonly caseSkins?: CaseSkin[];
}

export interface ReconstructCaseProps extends CaseProps {}

export interface Case extends Readonly<CaseProps> {}
export class Case extends DomainModel<CaseProps> {
  private constructor(props: CaseProps) {
    super(props);
  }

  static create(props: CreateCaseProps): Case {
    return new Case({
      ...props,
      caseSkins: props.caseSkins ?? [],
    });
  }

  static reconstruct(props: ReconstructCaseProps): Case {
    return new Case(props);
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      caseSkins: this.props.caseSkins.map((cs) => cs.toPrimitives()),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
