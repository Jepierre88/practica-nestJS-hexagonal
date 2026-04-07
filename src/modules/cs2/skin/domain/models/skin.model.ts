import { DomainModel } from '@shared/domain/models/domain.model';

export interface SkinProps {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateSkinProps {
  readonly name: string;
}

export interface ReconstructSkinProps extends SkinProps {}

export class Skin extends DomainModel {
  private readonly props: SkinProps;

  private constructor(props: SkinProps) {
    super();
    this.props = props;
  }

  static create(props: CreateSkinProps): Skin {
    return new Skin(props);
  }

  static reconstruct(props: ReconstructSkinProps): Skin {
    return new Skin(props);
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
