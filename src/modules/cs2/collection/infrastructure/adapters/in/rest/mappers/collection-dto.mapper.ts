import { Collection } from '@cs2/collection/domain/models/collection.model';
import { CollectionResponseDto } from '../dtos/collection-response.dto';

export class CollectionDtoMapper {
  static toResponse(entity: Collection): CollectionResponseDto {
    const primitives = entity.toPrimitives();
    return new CollectionResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  static toResponseList(entities: Collection[]): CollectionResponseDto[] {
    return entities.map(CollectionDtoMapper.toResponse);
  }
}
