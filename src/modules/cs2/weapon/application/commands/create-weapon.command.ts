export interface CreateWeaponCommandProps {
  readonly name: string;
}

export class CreateWeaponCommand {
  private constructor(
    public readonly name: string,
  ) {}

  static create(props: CreateWeaponCommandProps): CreateWeaponCommand {
    return new CreateWeaponCommand(props.name);
  }
}
