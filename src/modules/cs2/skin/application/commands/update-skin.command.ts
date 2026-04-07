export interface UpdateSkinCommandProps {
  readonly id: string;
  readonly name?: string;
}

export class UpdateSkinCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(props: UpdateSkinCommandProps): UpdateSkinCommand {
    return new UpdateSkinCommand(props.id, props.name);
  }
}
