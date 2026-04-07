import { Injectable } from '@nestjs/common';
import { UpdateCollectionUseCase } from '../ports/in/update-collection.port';
import { UpdateCollectionCommand } from '../commands/update-collection.command';
import { Collection } from '../../domain/models/collection.model';
import { CollectionRepositoryPort } from '../ports/out/collection-repository.port';
import { CollectionNotFoundException } from '../../domain/exceptions/collection.exception';

@Injectable()
export class UpdateCollectionService implements UpdateCollectionUseCase {
  constructor(private readonly collectionRepository: CollectionRepositoryPort) {}

  async execute(command: UpdateCollectionCommand): Promise<Collection> {
    const existing = await this.collectionRepository.findById(command.id);
    if (!existing) {
      throw new CollectionNotFoundException(command.id);
    }
    return this.collectionRepository.update(command.id, existing);
  }
}
