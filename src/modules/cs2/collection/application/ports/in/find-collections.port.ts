import { Collection } from '@cs2/collection/domain/models/collection.model';

export abstract class FindCollectionsUseCase {
  abstract findAll(): Promise<Collection[]>;
  abstract findById(id: string): Promise<Collection>;
}
