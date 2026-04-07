import { Injectable } from '@nestjs/common';
import { UpdateSkinUseCase } from '../ports/in/update-skin.port';
import { UpdateSkinCommand } from '../commands/update-skin.command';
import { Skin } from '../../domain/models/skin.model';
import { SkinRepositoryPort } from '../ports/out/skin-repository.port';
import { SkinNotFoundException } from '../../domain/exceptions/skin.exception';

@Injectable()
export class UpdateSkinService implements UpdateSkinUseCase {
  constructor(private readonly skinRepository: SkinRepositoryPort) {}

  async execute(command: UpdateSkinCommand): Promise<Skin> {
    const existing = await this.skinRepository.findById(command.id);
    if (!existing) {
      throw new SkinNotFoundException(command.id);
    }
    return this.skinRepository.update(command.id, existing);
  }
}
