import { Injectable } from '@nestjs/common';
import { CreateSkinUseCase } from '../ports/in/create-skin.port';
import { CreateSkinCommand } from '../commands/create-skin.command';
import { Skin } from '../../domain/models/skin.model';
import { SkinRepositoryPort } from '../ports/out/skin-repository.port';

@Injectable()
export class CreateSkinService implements CreateSkinUseCase {
  constructor(private readonly skinRepository: SkinRepositoryPort) {}

  async execute(command: CreateSkinCommand): Promise<Skin> {
    const entity = Skin.create({ name: command.name });
    return this.skinRepository.create(entity);
  }
}
