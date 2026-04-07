export interface AddSkinToCaseCommandProps {
  readonly caseId: string;
  readonly skinId: string;
}

export class AddSkinToCaseCommand {
  private constructor(
    public readonly caseId: string,
    public readonly skinId: string,
  ) {}

  static create(props: AddSkinToCaseCommandProps): AddSkinToCaseCommand {
    return new AddSkinToCaseCommand(props.caseId, props.skinId);
  }
}
