export interface CreateCaseCommandProps {
  readonly name: string;
}

export class CreateCaseCommand {
  private constructor(
    public readonly name: string,
  ) {}

  static create(props: CreateCaseCommandProps): CreateCaseCommand {
    return new CreateCaseCommand(props.name);
  }
}
