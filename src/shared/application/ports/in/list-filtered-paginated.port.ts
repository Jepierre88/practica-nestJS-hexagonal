import { ListFilteredPaginatedCommand } from '@shared/application/commands/list-filtered-paginated.command';
import { PaginatedModel } from '@shared/domain/models/paginated.model';

export abstract class ListFilteredPaginatedUseCase {
  abstract execute(
    command: ListFilteredPaginatedCommand,
  ): Promise<PaginatedModel>;
}
