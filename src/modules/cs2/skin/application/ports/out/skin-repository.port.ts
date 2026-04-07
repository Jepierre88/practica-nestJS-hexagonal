import { Skin } from '@cs2/skin/domain/models/skin.model';

export abstract class SkinRepositoryPort {
  abstract create(entity: Skin): Promise<Skin>;
  abstract findById(id: string): Promise<Skin | null>;
  abstract findAll(): Promise<Skin[]>;
  abstract update(id: string, entity: Skin): Promise<Skin>;
  abstract delete(id: string): Promise<void>;
}
