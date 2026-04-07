export interface AddCaseToOpeningCommandProps {
  readonly openingId: string;
  readonly caseId: string;
  readonly resultSkinId: string;
}

export class AddCaseToOpeningCommand {
  private constructor(
    public readonly openingId: string,
    public readonly caseId: string,
    public readonly resultSkinId: string,
  ) {}

  static create(props: AddCaseToOpeningCommandProps): AddCaseToOpeningCommand {
    return new AddCaseToOpeningCommand(props.openingId, props.caseId, props.resultSkinId);
  }
}
