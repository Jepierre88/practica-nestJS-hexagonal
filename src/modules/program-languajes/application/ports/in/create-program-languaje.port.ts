import { UseCase } from "@shared/interfaces/use-case.interface";
import { CreateProgramLanguajeCommand } from "../../commands/create-program-languaje.command";
import { ProgramLanguaje } from "@program-languajes/domain/models/program-languaje.model";

export abstract class CreateProgramLanguajeUseCase implements UseCase<CreateProgramLanguajeCommand, ProgramLanguaje> {
  abstract execute(input: CreateProgramLanguajeCommand): Promise<ProgramLanguaje>;
}