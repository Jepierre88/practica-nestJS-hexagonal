interface PaginatedModelProps<T> {
  readonly items: T[];
  readonly totalItems: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export class PaginatedModel<T> {
  private props: PaginatedModelProps<T>;
  private constructor(props: PaginatedModelProps<T>){
    this.props = props
  }

  static create<T>(props: PaginatedModelProps<T>): PaginatedModel<T> {
    return new PaginatedModel<T>(props);
  }

  get items(): T[] {
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
}
