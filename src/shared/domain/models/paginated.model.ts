import { DomainModel } from './domain.model';

interface PaginatedModelProps {
  readonly items: DomainModel[];
  readonly totalItems: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export class PaginatedModel {
  private props: PaginatedModelProps;
  private constructor(props: PaginatedModelProps) {
    this.props = props;
  }

  static create(props: PaginatedModelProps): PaginatedModel {
    return new PaginatedModel(props);
  }

  get items(): DomainModel[] {
    return this.props.items;
  }

  get totalItems(): number {
    return this.props.totalItems;
  }

  get currentPage(): number {
    return this.props.currentPage;
  }

  get totalPages(): number {
    return this.props.totalPages;
  }

  get hasNextPage(): boolean {
    return this.props.hasNextPage;
  }

  get hasPreviousPage(): boolean {
    return this.props.hasPreviousPage;
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
