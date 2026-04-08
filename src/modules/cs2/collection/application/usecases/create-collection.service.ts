import { Injectable } from '@nestjs/common';
import { CreateCollectionUseCase } from '../ports/in/create-collection.port';
import { CreateCollectionCommand } from '../commands/create-collection.command';
import { Collection } from '../../domain/models/collection.model';
import { CollectionRepositoryPort } from '../ports/out/collection-repository.port';

@Injectable()
export class CreateCollectionService implements CreateCollectionUseCase {
  constructor(
    private readonly collectionRepository: CollectionRepositoryPort,
  ) {}

  async execute(command: CreateCollectionCommand): Promise<Collection> {
    const entity = Collection.create({ name: command.name });
    return this.collectionRepository.create(entity);
  }
}
