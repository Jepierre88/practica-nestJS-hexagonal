export interface ListPaginatedCommand {
  readonly page: number;
  readonly limit: number;
  readonly orderBy?: string;
  readonly order?: 'ASC' | 'DESC';
}
