import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";
import { CrudRepositoryPort } from "@shared/application/ports/out/crud-repository.port";
import { PaginatedRepositoryPort } from "@shared/application/ports/out/paginated-repository.port";
import { PaginatedModel } from "@shared/domain/models/paginated.model";
import { ProgramLanguaje } from "@program-languajes/domain/models/program-languaje.model";

export abstract class ProgramLanguajeRepositoryPort implements CrudRepositoryPort<ProgramLanguaje>, PaginatedRepositoryPort<ProgramLanguaje> {
  abstract create(entity: ProgramLanguaje): Promise<ProgramLanguaje>
  abstract findById(id: string): Promise<ProgramLanguaje | null>
  abstract findAll(): Promise<ProgramLanguaje[]>;
  abstract update(id: string, entity: ProgramLanguaje): Promise<ProgramLanguaje>;
  abstract delete(id: string): Promise<void>;
  abstract findByName(name: string): Promise<ProgramLanguaje | null>;
  abstract findByDifficulty(difficulty: number): Promise<ProgramLanguaje[]>;
  abstract listPaginated(params: ListPaginatedCommand): Promise<PaginatedModel<ProgramLanguaje>>;

} 