export interface CreateSkinCommandProps {
  readonly name: string;
  readonly price: number;
  readonly skinFloat: number;
  readonly weaponId: string;
  readonly collectionId: string;
}

export class CreateSkinCommand {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly skinFloat: number,
    public readonly weaponId: string,
    public readonly collectionId: string,
  ) {}

  static create(props: CreateSkinCommandProps): CreateSkinCommand {
    return new CreateSkinCommand(
      props.name,
      props.price,
      props.skinFloat,
      props.weaponId,
      props.collectionId,
    );
  }
}
