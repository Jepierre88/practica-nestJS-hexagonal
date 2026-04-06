import { Inject, Injectable } from '@nestjs/common';
import { EditProgramLanguajeUseCase } from '../ports/in/edit-program-languaje.port';
import { ProgramLanguaje } from '@program-languajes/domain/models/program-languaje.model';
import { EditProgramLanguajeCommand } from '../commands/edit-program-languaje.command';
import { ProgramLanguajeRepositoryPort } from '../ports/out/program-languaje-repository.port';
import { NotFoundProgramLanguajeException } from '@program-languajes/domain/exceptions/program-languaje.exception';

@Injectable()
export class EditProgramLanguajeService implements EditProgramLanguajeUseCase {
  constructor(
    @Inject(ProgramLanguajeRepositoryPort)
    private readonly programLanguajeRepository: ProgramLanguajeRepositoryPort,
  ) {}

  async execute(input: EditProgramLanguajeCommand): Promise<ProgramLanguaje> {
    const exist = await this.programLanguajeRepository.findById(input.id);

    if (!exist) {
      throw new NotFoundProgramLanguajeException(input.id);
    }

    const current = exist.toPrimitives();
    const edited = ProgramLanguaje.reconstruct({
      ...current,
      name: input.name ?? current.name,
      description: input.description ?? current.description,
      difficulty: input.difficulty ?? current.difficulty,
    });
    return await this.programLanguajeRepository.update(input.id, edited);
  }
}
