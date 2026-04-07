export interface RemoveSkinFromCaseCommandProps {
  readonly caseId: string;
  readonly skinId: string;
}

export class RemoveSkinFromCaseCommand {
  private constructor(
    public readonly caseId: string,
    public readonly skinId: string,
  ) {}

  static create(props: RemoveSkinFromCaseCommandProps): RemoveSkinFromCaseCommand {
    return new RemoveSkinFromCaseCommand(props.caseId, props.skinId);
  }
}
