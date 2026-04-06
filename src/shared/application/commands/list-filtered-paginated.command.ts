interface ListFilteredPaginatedCommandProps {
  readonly page: number;
  readonly limit: number;
  readonly orderBy?: string;
  readonly order?: 'ASC' | 'DESC';
  readonly search?: string;
  readonly filters?: Record<string, any>;
}

export class ListFilteredPaginatedCommand {
  private props: ListFilteredPaginatedCommandProps;

  private constructor(props: ListFilteredPaginatedCommandProps) {
    this.props = props;
  }

  static create(
    props: ListFilteredPaginatedCommandProps,
  ): ListFilteredPaginatedCommand {
    return new ListFilteredPaginatedCommand(props);
  }

  get page(): number {
    return this.props.page;
  }

  get limit(): number {
    return this.props.limit;
  }

  get orderBy(): string | undefined {
    return this.props.orderBy;
  }

  get order(): 'ASC' | 'DESC' | undefined {
    return this.props.order;
  }

  get search(): string | undefined {
    return this.props.search;
  }

  get filters(): Record<string, any> | undefined {
    return this.props.filters;
  }
}
