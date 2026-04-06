import { EditProgramLanguajeCommand } from '@program-languajes/application/commands/edit-program-languaje.command';
import { ProgramLanguaje } from '@program-languajes/domain/models/program-languaje.model';
import { UseCasePort } from '@shared/application/ports/in/use-case.port';

export abstract class EditProgramLanguajeUseCase implements UseCasePort<
  EditProgramLanguajeCommand,
  ProgramLanguaje
> {
  abstract execute(input: EditProgramLanguajeCommand): Promise<ProgramLanguaje>;
}
