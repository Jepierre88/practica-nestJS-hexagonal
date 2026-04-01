import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";
import { PaginatedModel } from "@shared/domain/models/paginated.model";

export interface PaginatedRepositoryPort {
  listPaginated(params: ListPaginatedCommand): Promise<PaginatedModel>;
}
