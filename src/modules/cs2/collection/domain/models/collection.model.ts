import { DomainModel } from '@shared/domain/models/domain.model';

export interface CollectionProps {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateCollectionProps {
  readonly name: string;
}

export interface ReconstructCollectionProps extends CollectionProps {}

export class Collection extends DomainModel {
  private readonly props: CollectionProps;

  private constructor(props: CollectionProps) {
    super();
    this.props = props;
  }

  static create(props: CreateCollectionProps): Collection {
    return new Collection(props);
  }

  static reconstruct(props: ReconstructCollectionProps): Collection {
    return new Collection(props);
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
