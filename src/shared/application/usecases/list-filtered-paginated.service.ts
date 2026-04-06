import { ListFilteredPaginatedUseCase } from '../ports/in/list-filtered-paginated.port';
import { ListFilteredPaginatedCommand } from '../commands/list-filtered-paginated.command';
import { FilteredPaginatedRepositoryPort } from '../ports/out/filtered-paginated-repository.port';
import { PaginatedModel } from '../../domain/models/paginated.model';

/**
 * Servicio base reutilizable para listados paginados con filtros.
 * Los módulos extienden esta clase y pasan su repositorio al constructor.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class ListTasksService extends ListFilteredPaginatedService {
 *   constructor(taskRepo: TaskRepositoryPort) {
 *     super(taskRepo);
 *   }
 * }
 * ```
 */
export abstract class ListFilteredPaginatedService implements ListFilteredPaginatedUseCase {
  constructor(protected readonly repository: FilteredPaginatedRepositoryPort) {}

  async execute(
    command: ListFilteredPaginatedCommand,
  ): Promise<PaginatedModel> {
    return this.repository.listFilteredPaginated(command);
  }
}
