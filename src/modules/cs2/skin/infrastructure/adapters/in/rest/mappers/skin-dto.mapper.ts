import { Skin } from '@cs2/skin/domain/models/skin.model';
import { SkinResponseDto } from '../dtos/skin-response.dto';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';

export class SkinDtoMapper extends DtoMapper<Skin, SkinResponseDto> {
  toResponse(entity: Skin): SkinResponseDto {
    const primitives = entity.toPrimitives();
    return new SkinResponseDto({
      id: primitives.id!,
      name: primitives.name,
      price: primitives.price,
      skinFloat: primitives.skinFloat,
      weapon: {
        id: primitives.weapon.id!,
        name: primitives.weapon.name,
      },
      collection: {
        id: primitives.collection.id!,
        name: primitives.collection.name,
      },
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  toResponseList(entities: Skin[]): SkinResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}
