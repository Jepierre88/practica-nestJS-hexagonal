import { Injectable } from '@nestjs/common';
import { FindCollectionsUseCase } from '../ports/in/find-collections.port';
import { Collection } from '../../domain/models/collection.model';
import { CollectionRepositoryPort } from '../ports/out/collection-repository.port';
import { CollectionNotFoundException } from '../../domain/exceptions/collection.exception';

@Injectable()
export class FindCollectionsService implements FindCollectionsUseCase {
  constructor(
    private readonly collectionRepository: CollectionRepositoryPort,
  ) {}

  async findAll(): Promise<Collection[]> {
    return this.collectionRepository.findAll();
  }

  async findById(id: string): Promise<Collection> {
    const entity = await this.collectionRepository.findById(id);
    if (!entity) {
      throw new CollectionNotFoundException(id);
    }
    return entity;
  }
}
