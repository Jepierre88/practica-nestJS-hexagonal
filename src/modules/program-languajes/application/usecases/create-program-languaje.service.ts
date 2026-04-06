import { Inject, Injectable } from '@nestjs/common';
import { CreateProgramLanguajeUseCase } from '../ports/in/create-program-languaje.port';
import { CreateProgramLanguajeCommand } from '../commands/create-program-languaje.command';
import { ProgramLanguaje } from '../../domain/models/program-languaje.model';
import { ProgramLanguajeRepositoryPort } from '../ports/out/program-languaje-repository.port';
import { ProgramLanguajeAlreadyExistsException } from '../../domain/exceptions/program-languaje.exception';

@Injectable()
export class CreateProgramLanguajeService implements CreateProgramLanguajeUseCase {
  constructor(
    @Inject(ProgramLanguajeRepositoryPort)
    private readonly programLanguajeRepository: ProgramLanguajeRepositoryPort,
  ) {}

  async execute(
    command: CreateProgramLanguajeCommand,
  ): Promise<ProgramLanguaje> {
    const alreadyExists = await this.programLanguajeRepository.findByName(
      command.name,
    );

    if (alreadyExists) {
      throw new ProgramLanguajeAlreadyExistsException(command.name);
    }
    const programLanguaje = ProgramLanguaje.create(command);

    return await this.programLanguajeRepository.create(programLanguaje);
  }
}
