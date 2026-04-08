import { Injectable } from '@nestjs/common';
import { DeleteCollectionUseCase } from '../ports/in/delete-collection.port';
import { CollectionRepositoryPort } from '../ports/out/collection-repository.port';
import { CollectionNotFoundException } from '../../domain/exceptions/collection.exception';

@Injectable()
export class DeleteCollectionService implements DeleteCollectionUseCase {
  constructor(
    private readonly collectionRepository: CollectionRepositoryPort,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.collectionRepository.findById(id);
    if (!existing) {
      throw new CollectionNotFoundException(id);
    }
    await this.collectionRepository.delete(id);
  }
}
