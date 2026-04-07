import { Injectable } from '@nestjs/common';
import { UpdateOpeningUseCase } from '../ports/in/update-opening.port';
import { UpdateOpeningCommand } from '../commands/update-opening.command';
import { Opening } from '../../domain/models/opening.model';
import { OpeningRepositoryPort } from '../ports/out/opening-repository.port';
import { OpeningNotFoundException } from '../../domain/exceptions/opening.exception';

@Injectable()
export class UpdateOpeningService implements UpdateOpeningUseCase {
  constructor(private readonly openingRepository: OpeningRepositoryPort) {}

  async execute(command: UpdateOpeningCommand): Promise<Opening> {
    const existing = await this.openingRepository.findById(command.id);
    if (!existing) {
      throw new OpeningNotFoundException(command.id);
    }
    return this.openingRepository.update(command.id, existing);
  }
}
