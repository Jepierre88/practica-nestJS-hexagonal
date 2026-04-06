import { ListFilteredPaginatedCommand } from '@shared/application/commands/list-filtered-paginated.command';
import { PaginatedModel } from '@shared/domain/models/paginated.model';

export interface FilteredPaginatedRepositoryPort {
  listFilteredPaginated(
    params: ListFilteredPaginatedCommand,
  ): Promise<PaginatedModel>;
}
