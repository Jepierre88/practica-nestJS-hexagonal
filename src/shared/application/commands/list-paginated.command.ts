interface ListPaginatedCommandProps {
  readonly page: number;
  readonly limit: number;
  readonly orderBy?: string;
  readonly order?: 'ASC' | 'DESC';
}

export class ListPaginatedCommand {
  private props: ListPaginatedCommandProps;
  private constructor(props: ListPaginatedCommandProps) {
    this.props = props;
  }

  static create(props: ListPaginatedCommandProps): ListPaginatedCommand {
    return new ListPaginatedCommand(props);
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
}
