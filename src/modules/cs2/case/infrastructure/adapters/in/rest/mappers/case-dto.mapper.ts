import { Case } from '@cs2/case/domain/models/case.model';
import { CaseResponseDto } from '../dtos/case-response.dto';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';

export class CaseDtoMapper extends DtoMapper<Case, CaseResponseDto> {
  toResponse(entity: Case): CaseResponseDto {
    const primitives = entity.toPrimitives();
    return new CaseResponseDto({
      id: primitives.id!,
      name: primitives.name,
      price: primitives.price,
      skins: primitives.caseSkins.map((cs) => ({
        skinId: cs.skin.id!,
        skinName: cs.skin.name,
        dropRate: cs.dropRate,
      })),
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  toResponseList(entities: Case[]): CaseResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}
