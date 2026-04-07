import { DomainModel } from '@shared/domain/models/domain.model';

export interface WeaponProps {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateWeaponProps extends Omit<WeaponProps, 'id' | 'createdAt' | 'updatedAt'> {
}

export interface ReconstructWeaponProps extends WeaponProps {}

export class Weapon extends DomainModel {
  private readonly props: WeaponProps;

  private constructor(props: WeaponProps) {
    super();
    this.props = props;
  }

  static create(props: CreateWeaponProps): Weapon {
    return new Weapon(props);
  }

  static reconstruct(props: ReconstructWeaponProps): Weapon {
    return new Weapon(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
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
