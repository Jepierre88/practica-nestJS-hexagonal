export interface UpdateSkinCommand {
  readonly id: string;
  readonly name?: string;
  readonly price?: number;
  readonly skinFloat?: number;
  readonly weaponId?: string;
  readonly collectionId?: string;
}
