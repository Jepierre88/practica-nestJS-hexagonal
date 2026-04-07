export interface RemoveCaseFromOpeningCommandProps {
  readonly openingId: string;
  readonly caseId: string;
}

export class RemoveCaseFromOpeningCommand {
  private constructor(
    public readonly openingId: string,
    public readonly caseId: string,
  ) {}

  static create(props: RemoveCaseFromOpeningCommandProps): RemoveCaseFromOpeningCommand {
    return new RemoveCaseFromOpeningCommand(props.openingId, props.caseId);
  }
}
