import { DomainModel } from './domain.model';

interface PaginatedModelProps {
  readonly items: DomainModel<any>[];
  readonly totalItems: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export type CreatePaginatedModelProps = Readonly<PaginatedModelProps>;
export class PaginatedModel extends DomainModel<PaginatedModelProps> {
  private constructor(props: PaginatedModelProps) {
    super(props);
  }

  static create(props: CreatePaginatedModelProps): PaginatedModel {
    return new PaginatedModel(props);
  }

  toPrimitives() {
    return {
      items: this.props.items.map((item) => item.toPrimitives()),
      totalItems: this.props.totalItems,
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
      hasNextPage: this.props.hasNextPage,
      hasPreviousPage: this.props.hasPreviousPage,
    };
  }
}
