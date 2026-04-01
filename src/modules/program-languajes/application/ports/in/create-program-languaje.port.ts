import { UseCasePort } from "@shared/application/ports/in/use-case.port";
import { CreateProgramLanguajeCommand } from "../../commands/create-program-languaje.command";
import { ProgramLanguaje } from "@program-languajes/domain/models/program-languaje.model";

export abstract class CreateProgramLanguajeUseCase implements UseCasePort<CreateProgramLanguajeCommand, ProgramLanguaje> {
  abstract execute(input: CreateProgramLanguajeCommand): Promise<ProgramLanguaje>;
}