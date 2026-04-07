import { Injectable } from '@nestjs/common';
import { DeleteOpeningUseCase } from '../ports/in/delete-opening.port';
import { OpeningRepositoryPort } from '../ports/out/opening-repository.port';
import { OpeningNotFoundException } from '../../domain/exceptions/opening.exception';

@Injectable()
export class DeleteOpeningService implements DeleteOpeningUseCase {
  constructor(private readonly openingRepository: OpeningRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const existing = await this.openingRepository.findById(id);
    if (!existing) {
      throw new OpeningNotFoundException(id);
    }
    await this.openingRepository.delete(id);
  }
}
