export interface CreateOpeningCommandProps {
  readonly name: string;
}

export class CreateOpeningCommand {
  private constructor(
    public readonly name: string,
  ) {}

  static create(props: CreateOpeningCommandProps): CreateOpeningCommand {
    return new CreateOpeningCommand(props.name);
  }
}
