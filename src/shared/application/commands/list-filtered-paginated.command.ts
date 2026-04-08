export interface ListFilteredPaginatedCommand {
  readonly page: number;
  readonly limit: number;
  readonly orderBy?: string;
  readonly order?: 'ASC' | 'DESC';
  readonly search?: string;
  readonly filters?: Record<string, any>;
}
