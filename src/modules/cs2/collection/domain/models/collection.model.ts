import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

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

export interface Collection extends DomainProps<CollectionProps> {}
export class Collection extends DomainModel<CollectionProps> {
  private constructor(props: CollectionProps) {
    super(props);
  }

  static create(props: CreateCollectionProps): Collection {
    return new Collection(props);
  }

  static reconstruct(props: ReconstructCollectionProps): Collection {
    return new Collection(props);
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
