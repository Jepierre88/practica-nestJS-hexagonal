export interface CreateSkinCommandProps {
  readonly name: string;
}

export class CreateSkinCommand {
  private constructor(
    public readonly name: string,
  ) {}

  static create(props: CreateSkinCommandProps): CreateSkinCommand {
    return new CreateSkinCommand(props.name);
  }
}
