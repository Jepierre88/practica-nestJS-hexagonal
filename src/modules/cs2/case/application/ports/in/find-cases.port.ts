import { Case } from '@cs2/case/domain/models/case.model';

export abstract class FindCasesUseCase {
  abstract findAll(): Promise<Case[]>;
  abstract findById(id: string): Promise<Case>;
}
