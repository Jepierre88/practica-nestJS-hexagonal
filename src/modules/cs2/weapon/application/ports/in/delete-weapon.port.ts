export abstract class DeleteWeaponUseCase {
  abstract execute(id: string): Promise<void>;
}
