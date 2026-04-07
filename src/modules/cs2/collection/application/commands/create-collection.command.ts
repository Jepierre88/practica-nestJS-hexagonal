export interface CreateCollectionCommandProps {
  readonly name: string;
}

export class CreateCollectionCommand {
  private constructor(
    public readonly name: string,
  ) {}

  static create(props: CreateCollectionCommandProps): CreateCollectionCommand {
    return new CreateCollectionCommand(props.name);
  }
}
