import { DomainModel } from '@shared/domain/models/domain.model';
import { OpeningCase } from './opening-case.model';

export interface OpeningProps {
  readonly id?: string;
  readonly name: string;
  readonly openingCases: OpeningCase[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateOpeningProps {
  readonly name: string;
  readonly openingCases?: OpeningCase[];
}

export interface ReconstructOpeningProps extends OpeningProps {}

export interface Opening extends Readonly<OpeningProps> {}
export class Opening extends DomainModel<OpeningProps> {
  private constructor(props: OpeningProps) {
    super(props);
  }

  static create(props: CreateOpeningProps): Opening {
    return new Opening({
      ...props,
      openingCases: props.openingCases ?? [],
    });
  }

  static reconstruct(props: ReconstructOpeningProps): Opening {
    return new Opening(props);
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      openingCases: this.props.openingCases.map((oc) => oc.toPrimitives()),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
