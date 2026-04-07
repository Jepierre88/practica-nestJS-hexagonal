import { Opening } from '@cs2/opening/domain/models/opening.model';
import { OpeningResponseDto } from '../dtos/opening-response.dto';

export class OpeningDtoMapper {
  static toResponse(entity: Opening): OpeningResponseDto {
    const primitives = entity.toPrimitives();
    return new OpeningResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  static toResponseList(entities: Opening[]): OpeningResponseDto[] {
    return entities.map(OpeningDtoMapper.toResponse);
  }
}
