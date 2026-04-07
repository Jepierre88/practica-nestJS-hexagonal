import { CaseOpenResult } from '../../commands/open-case-result';

export abstract class OpenCaseUseCase {
  abstract execute(caseId: string): Promise<CaseOpenResult>;
}
