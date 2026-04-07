import { Injectable } from '@nestjs/common';
import { FindOpeningsUseCase } from '../ports/in/find-openings.port';
import { Opening } from '../../domain/models/opening.model';
import { OpeningRepositoryPort } from '../ports/out/opening-repository.port';
import { OpeningNotFoundException } from '../../domain/exceptions/opening.exception';

@Injectable()
export class FindOpeningsService implements FindOpeningsUseCase {
  constructor(private readonly openingRepository: OpeningRepositoryPort) {}

  async findAll(): Promise<Opening[]> {
    return this.openingRepository.findAll();
  }

  async findById(id: string): Promise<Opening> {
    const entity = await this.openingRepository.findById(id);
    if (!entity) {
      throw new OpeningNotFoundException(id);
    }
    return entity;
  }
}
