import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { UpdateWeaponCommand } from '@cs2/weapon/application/commands/update-weapon.command';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';

export abstract class UpdateWeaponUseCase implements UseCasePort<
  UpdateWeaponCommand,
  Weapon
> {
  abstract execute(input: UpdateWeaponCommand): Promise<Weapon>;
}
