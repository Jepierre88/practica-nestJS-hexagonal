import { Skin } from '@cs2/skin/domain/models/skin.model';

export abstract class FindSkinsUseCase {
  abstract findAll(): Promise<Skin[]>;
  abstract findById(id: string): Promise<Skin>;
}
