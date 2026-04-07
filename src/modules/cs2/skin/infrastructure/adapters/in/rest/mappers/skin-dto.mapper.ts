import { Skin } from '@cs2/skin/domain/models/skin.model';
import { SkinResponseDto } from '../dtos/skin-response.dto';

export class SkinDtoMapper {
  static toResponse(entity: Skin): SkinResponseDto {
    const primitives = entity.toPrimitives();
    return new SkinResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  static toResponseList(entities: Skin[]): SkinResponseDto[] {
    return entities.map(SkinDtoMapper.toResponse);
  }
}
