export interface AddCaseToOpeningCommand {
  readonly openingId: string;
  readonly caseId: string;
  readonly resultSkinId: string;
}
