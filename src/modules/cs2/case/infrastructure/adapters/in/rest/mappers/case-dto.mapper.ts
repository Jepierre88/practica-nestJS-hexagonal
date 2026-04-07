import { Case } from '@cs2/case/domain/models/case.model';
import { CaseResponseDto } from '../dtos/case-response.dto';

export class CaseDtoMapper {
  static toResponse(entity: Case): CaseResponseDto {
    const primitives = entity.toPrimitives();
    return new CaseResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  static toResponseList(entities: Case[]): CaseResponseDto[] {
    return entities.map(CaseDtoMapper.toResponse);
  }
}
