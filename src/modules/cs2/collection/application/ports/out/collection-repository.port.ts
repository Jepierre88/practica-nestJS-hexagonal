import { Collection } from '@cs2/collection/domain/models/collection.model';

export abstract class CollectionRepositoryPort {
  abstract create(entity: Collection): Promise<Collection>;
  abstract findById(id: string): Promise<Collection | null>;
  abstract findAll(): Promise<Collection[]>;
  abstract update(id: string, entity: Collection): Promise<Collection>;
  abstract delete(id: string): Promise<void>;
}
