import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

export interface WeaponProps {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateWeaponProps extends Omit<
  WeaponProps,
  'id' | 'createdAt' | 'updatedAt'
> {}

export interface ReconstructWeaponProps extends WeaponProps {}

export interface Weapon extends DomainProps<WeaponProps> {}
export class Weapon extends DomainModel<WeaponProps> {
  private constructor(props: WeaponProps) {
    super(props);
  }

  static create(props: CreateWeaponProps): Weapon {
    return new Weapon(props);
  }

  static reconstruct(props: ReconstructWeaponProps): Weapon {
    return new Weapon(props);
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
