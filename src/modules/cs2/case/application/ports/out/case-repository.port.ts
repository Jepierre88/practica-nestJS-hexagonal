import { Case } from '@cs2/case/domain/models/case.model';

export abstract class CaseRepositoryPort {
  abstract create(entity: Case): Promise<Case>;
  abstract findById(id: string): Promise<Case | null>;
  abstract findAll(): Promise<Case[]>;
  abstract update(id: string, entity: Case): Promise<Case>;
  abstract delete(id: string): Promise<void>;
  abstract addSkin(
    caseId: string,
    skinId: string,
    dropRate: number,
  ): Promise<void>;
  abstract removeSkin(caseId: string, skinId: string): Promise<void>;
}
