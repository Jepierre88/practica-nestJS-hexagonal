import { ProgramLanguaje } from "@program-languajes/domain/models/program-languaje.model";
import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";
import { UseCase } from "@shared/domain/interfaces/use-case.interface";
import { PaginatedModel } from "@shared/domain/models/paginated.model";

export abstract class ListProgramLanguajesUseCase implements UseCase<ListPaginatedCommand, PaginatedModel<ProgramLanguaje>>{
  abstract execute(input: ListPaginatedCommand): Promise<PaginatedModel<ProgramLanguaje>>;
}