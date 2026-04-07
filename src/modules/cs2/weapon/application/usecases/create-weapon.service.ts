import { Injectable } from '@nestjs/common';
import { CreateWeaponUseCase } from '../ports/in/create-weapon.port';
import { CreateWeaponCommand } from '../commands/create-weapon.command';
import { Weapon } from '../../domain/models/weapon.model';
import { WeaponRepositoryPort } from '../ports/out/weapon-repository.port';

@Injectable()
export class CreateWeaponService implements CreateWeaponUseCase {
  constructor(private readonly weaponRepository: WeaponRepositoryPort) {}

  async execute(command: CreateWeaponCommand): Promise<Weapon> {
    const entity = Weapon.create({ name: command.name });
    return this.weaponRepository.create(entity);
  }
}
