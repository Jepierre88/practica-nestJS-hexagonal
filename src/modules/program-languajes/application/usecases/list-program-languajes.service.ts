import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";
import { ListProgramLanguajesUseCase } from "../ports/in/list-program-languajes.port";
import { PaginatedModel } from "@shared/domain/models/paginated.model";
import { Inject, Injectable } from "@nestjs/common";
import { ProgramLanguajeRepositoryPort } from "../ports/out/program-languaje-repository.port";

@Injectable()
export class ListProgramLanguajesService implements ListProgramLanguajesUseCase {
  
  constructor(
    @Inject(ProgramLanguajeRepositoryPort) private readonly programLanguajeRepository: ProgramLanguajeRepositoryPort,
  ) {}

  async execute(input: ListPaginatedCommand): Promise<PaginatedModel> {
    return this.programLanguajeRepository.listPaginated(input);
  }
}