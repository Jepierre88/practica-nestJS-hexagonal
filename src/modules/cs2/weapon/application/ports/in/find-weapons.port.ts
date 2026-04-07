import { Weapon } from '@cs2/weapon/domain/models/weapon.model';

export abstract class FindWeaponsUseCase {
  abstract findAll(): Promise<Weapon[]>;
  abstract findById(id: string): Promise<Weapon>;
}
