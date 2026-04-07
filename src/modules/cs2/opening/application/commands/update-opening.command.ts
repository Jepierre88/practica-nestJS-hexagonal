export interface UpdateOpeningCommandProps {
  readonly id: string;
  readonly name?: string;
}

export class UpdateOpeningCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(props: UpdateOpeningCommandProps): UpdateOpeningCommand {
    return new UpdateOpeningCommand(props.id, props.name);
  }
}
