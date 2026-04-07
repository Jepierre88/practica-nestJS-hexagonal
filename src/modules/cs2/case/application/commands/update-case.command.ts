export interface UpdateCaseCommandProps {
  readonly id: string;
  readonly name?: string;
}

export class UpdateCaseCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(props: UpdateCaseCommandProps): UpdateCaseCommand {
    return new UpdateCaseCommand(props.id, props.name);
  }
}
