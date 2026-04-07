import { Opening } from '@cs2/opening/domain/models/opening.model';

export abstract class FindOpeningsUseCase {
  abstract findAll(): Promise<Opening[]>;
  abstract findById(id: string): Promise<Opening>;
}
