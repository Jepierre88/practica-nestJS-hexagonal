import { Case } from '@cs2/case/domain/models/case.model';
import { CaseSkin } from '@cs2/case/domain/models/case-skin.model';

export interface CaseOpenResult {
  readonly case_: Case;
  readonly winnerSkin: CaseSkin;
  readonly winnerIndex: number;
  readonly openingId: string;
}
