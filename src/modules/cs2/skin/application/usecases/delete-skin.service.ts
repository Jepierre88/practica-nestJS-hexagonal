import { Injectable } from '@nestjs/common';
import { DeleteSkinUseCase } from '../ports/in/delete-skin.port';
import { SkinRepositoryPort } from '../ports/out/skin-repository.port';
import { SkinNotFoundException } from '../../domain/exceptions/skin.exception';

@Injectable()
export class DeleteSkinService implements DeleteSkinUseCase {
  constructor(private readonly skinRepository: SkinRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const existing = await this.skinRepository.findById(id);
    if (!existing) {
      throw new SkinNotFoundException(id);
    }
    await this.skinRepository.delete(id);
  }
}
