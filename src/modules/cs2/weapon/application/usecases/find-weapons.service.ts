import { Injectable } from '@nestjs/common';
import { FindWeaponsUseCase } from '../ports/in/find-weapons.port';
import { Weapon } from '../../domain/models/weapon.model';
import { WeaponRepositoryPort } from '../ports/out/weapon-repository.port';
import { WeaponNotFoundException } from '../../domain/exceptions/weapon.exception';

@Injectable()
export class FindWeaponsService implements FindWeaponsUseCase {
  constructor(private readonly weaponRepository: WeaponRepositoryPort) {}

  async findAll(): Promise<Weapon[]> {
    return this.weaponRepository.findAll();
  }

  async findById(id: string): Promise<Weapon> {
    const entity = await this.weaponRepository.findById(id);
    if (!entity) {
      throw new WeaponNotFoundException(id);
    }
    return entity;
  }
}
