export interface UpdateWeaponCommandProps {
  readonly id: string;
  readonly name?: string;
}

export class UpdateWeaponCommand {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(props: UpdateWeaponCommandProps): UpdateWeaponCommand {
    return new UpdateWeaponCommand(props.id, props.name);
  }
}
