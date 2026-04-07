export interface UpdateCollectionCommandProps {
  readonly id: string;
  readonly name?: string;
}

export class UpdateCollectionCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(props: UpdateCollectionCommandProps): UpdateCollectionCommand {
    return new UpdateCollectionCommand(props.id, props.name);
  }
}
