import { DomainModel } from '@shared/domain/models/domain.model';

export interface CaseProps {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateCaseProps {
  readonly name: string;
}

export interface ReconstructCaseProps extends CaseProps {}

export class Case extends DomainModel {
  private readonly props: CaseProps;

  private constructor(props: CaseProps) {
    super();
    this.props = props;
  }

  static create(props: CreateCaseProps): Case {
    return new Case(props);
  }

  static reconstruct(props: ReconstructCaseProps): Case {
    return new Case(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
