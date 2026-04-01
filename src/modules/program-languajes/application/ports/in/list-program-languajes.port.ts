import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";
import { UseCasePort } from "@shared/application/ports/in/use-case.port";
import { PaginatedModel } from "@shared/domain/models/paginated.model";

export abstract class ListProgramLanguajesUseCase implements UseCasePort<ListPaginatedCommand, PaginatedModel>{
  abstract execute(input: ListPaginatedCommand): Promise<PaginatedModel>;
}