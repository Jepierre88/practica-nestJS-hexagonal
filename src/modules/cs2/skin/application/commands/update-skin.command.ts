export interface UpdateSkinCommandProps {
  readonly id: string;
  readonly name?: string;
  readonly price?: number;
  readonly skinFloat?: number;
  readonly weaponId?: string;
  readonly collectionId?: string;
}

export class UpdateSkinCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly price?: number,
    public readonly skinFloat?: number,
    public readonly weaponId?: string,
    public readonly collectionId?: string,
  ) {}

  static create(props: UpdateSkinCommandProps): UpdateSkinCommand {
    return new UpdateSkinCommand(
      props.id,
      props.name,
      props.price,
      props.skinFloat,
      props.weaponId,
      props.collectionId,
    );
  }
}
