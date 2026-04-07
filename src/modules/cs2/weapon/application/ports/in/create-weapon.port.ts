import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateWeaponCommand } from '@cs2/weapon/application/commands/create-weapon.command';
import { Weapon } from '@cs2/weapon/domain/models/weapon.model';

export abstract class CreateWeaponUseCase implements UseCasePort<CreateWeaponCommand, Weapon> {
  abstract execute(input: CreateWeaponCommand): Promise<Weapon>;
}
