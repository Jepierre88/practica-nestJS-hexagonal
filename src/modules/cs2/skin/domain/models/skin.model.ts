import { Collection } from '@cs2/collection/domain/models/collection.model';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

export interface SkinProps {
  readonly id?: string;
  readonly name: string;

  readonly price: number;
  readonly skinFloat: number;
  readonly weapon: Weapon;
  readonly collection: Collection;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateSkinProps extends Omit<
  SkinProps,
  'id' | 'createdAt' | 'updatedAt'
> {}

export interface ReconstructSkinProps extends SkinProps {}

export interface Skin extends DomainProps<SkinProps> {}
export class Skin extends DomainModel<SkinProps> {
  private constructor(props: SkinProps) {
    super(props);
  }

  static create(props: CreateSkinProps): Skin {
    return new Skin(props);
  }

  static reconstruct(props: ReconstructSkinProps): Skin {
    return new Skin(props);
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      skinFloat: this.props.skinFloat,
      weapon: this.props.weapon.toPrimitives(),
      collection: this.props.collection.toPrimitives(),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
