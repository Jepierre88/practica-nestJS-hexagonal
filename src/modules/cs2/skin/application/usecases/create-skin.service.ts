import { Injectable } from '@nestjs/common';
import { CreateSkinUseCase } from '../ports/in/create-skin.port';
import { CreateSkinCommand } from '../commands/create-skin.command';
import { Skin } from '../../domain/models/skin.model';
import { SkinRepositoryPort } from '../ports/out/skin-repository.port';
import { WeaponRepositoryPort } from '@cs2/weapon/application/ports/out/weapon-repository.port';
import { CollectionRepositoryPort } from '@cs2/collection/application/ports/out/collection-repository.port';

@Injectable()
export class CreateSkinService implements CreateSkinUseCase {
  constructor(
    private readonly skinRepository: SkinRepositoryPort,
    private readonly weaponRepository: WeaponRepositoryPort,
    private readonly collectionRepository: CollectionRepositoryPort,
  ) {}

  async execute(command: CreateSkinCommand): Promise<Skin> {
    const weapon = await this.weaponRepository.findById(command.weaponId);
    if (!weapon) {
      throw new Error(`Weapon "${command.weaponId}" not found.`);
    }

    const collection = await this.collectionRepository.findById(
      command.collectionId,
    );
    if (!collection) {
      throw new Error(`Collection "${command.collectionId}" not found.`);
    }

    const entity = Skin.create({
      name: command.name,
      price: command.price,
      skinFloat: command.skinFloat,
      weapon,
      collection,
    });

    return this.skinRepository.create(entity);
  }
}
