import { Injectable } from '@nestjs/common';
import { UpdateWeaponUseCase } from '../ports/in/update-weapon.port';
import { UpdateWeaponCommand } from '../commands/update-weapon.command';
import { Weapon } from '../../domain/models/weapon.model';
import { WeaponRepositoryPort } from '../ports/out/weapon-repository.port';
import { WeaponNotFoundException } from '../../domain/exceptions/weapon.exception';

@Injectable()
export class UpdateWeaponService implements UpdateWeaponUseCase {
  constructor(private readonly weaponRepository: WeaponRepositoryPort) {}

  async execute(command: UpdateWeaponCommand): Promise<Weapon> {
    const existing = await this.weaponRepository.findById(command.id);
    if (!existing) {
      throw new WeaponNotFoundException(command.id);
    }
    return this.weaponRepository.update(command.id, existing);
  }
}
