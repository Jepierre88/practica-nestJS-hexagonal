import { Weapon } from '@cs2/weapon/domain/models/weapon.model';

export abstract class WeaponRepositoryPort {
  abstract create(entity: Weapon): Promise<Weapon>;
  abstract findById(id: string): Promise<Weapon | null>;
  abstract findAll(): Promise<Weapon[]>;
  abstract update(id: string, entity: Weapon): Promise<Weapon>;
  abstract delete(id: string): Promise<void>;
}
