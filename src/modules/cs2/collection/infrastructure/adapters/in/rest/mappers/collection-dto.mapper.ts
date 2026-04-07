import { Collection } from '@cs2/collection/domain/models/collection.model';
import { CollectionResponseDto } from '../dtos/collection-response.dto';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';

export class CollectionDtoMapper extends DtoMapper<Collection, CollectionResponseDto> {
  toResponse(entity: Collection): CollectionResponseDto {
    const primitives = entity.toPrimitives();
    return new CollectionResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  toResponseList(entities: Collection[]): CollectionResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}
