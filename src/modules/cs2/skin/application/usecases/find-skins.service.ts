import { Injectable } from '@nestjs/common';
import { FindSkinsUseCase } from '../ports/in/find-skins.port';
import { Skin } from '../../domain/models/skin.model';
import { SkinRepositoryPort } from '../ports/out/skin-repository.port';
import { SkinNotFoundException } from '../../domain/exceptions/skin.exception';

@Injectable()
export class FindSkinsService implements FindSkinsUseCase {
  constructor(private readonly skinRepository: SkinRepositoryPort) {}

  async findAll(): Promise<Skin[]> {
    return this.skinRepository.findAll();
  }

  async findById(id: string): Promise<Skin> {
    const entity = await this.skinRepository.findById(id);
    if (!entity) {
      throw new SkinNotFoundException(id);
    }
    return entity;
  }
}
