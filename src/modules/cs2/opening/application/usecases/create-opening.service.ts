import { Injectable } from '@nestjs/common';
import { CreateOpeningUseCase } from '../ports/in/create-opening.port';
import { CreateOpeningCommand } from '../commands/create-opening.command';
import { Opening } from '../../domain/models/opening.model';
import { OpeningRepositoryPort } from '../ports/out/opening-repository.port';

@Injectable()
export class CreateOpeningService implements CreateOpeningUseCase {
  constructor(private readonly openingRepository: OpeningRepositoryPort) {}

  async execute(command: CreateOpeningCommand): Promise<Opening> {
    const entity = Opening.create({ name: command.name });
    return this.openingRepository.create(entity);
  }
}
