export interface UpdateCaseCommandProps {
  readonly id: string;
  readonly name?: string;
  readonly price?: number;
}

export class UpdateCaseCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly price?: number,
  ) {}

  static create(props: UpdateCaseCommandProps): UpdateCaseCommand {
    return new UpdateCaseCommand(props.id, props.name, props.price);
  }
}
