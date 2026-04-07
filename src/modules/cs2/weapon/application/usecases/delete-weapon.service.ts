import { Injectable } from '@nestjs/common';
import { DeleteWeaponUseCase } from '../ports/in/delete-weapon.port';
import { WeaponRepositoryPort } from '../ports/out/weapon-repository.port';
import { WeaponNotFoundException } from '../../domain/exceptions/weapon.exception';

@Injectable()
export class DeleteWeaponService implements DeleteWeaponUseCase {
  constructor(private readonly weaponRepository: WeaponRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const existing = await this.weaponRepository.findById(id);
    if (!existing) {
      throw new WeaponNotFoundException(id);
    }
    await this.weaponRepository.delete(id);
  }
}
