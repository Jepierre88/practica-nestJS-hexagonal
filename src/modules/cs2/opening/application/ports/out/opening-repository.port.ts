import { Opening } from '@cs2/opening/domain/models/opening.model';

export abstract class OpeningRepositoryPort {
  abstract create(entity: Opening): Promise<Opening>;
  abstract findById(id: string): Promise<Opening | null>;
  abstract findAll(): Promise<Opening[]>;
  abstract update(id: string, entity: Opening): Promise<Opening>;
  abstract delete(id: string): Promise<void>;
}
