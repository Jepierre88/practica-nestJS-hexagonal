import { Opening } from '@cs2/opening/domain/models/opening.model';
import { OpeningResponseDto } from '../dtos/opening-response.dto';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';

export class OpeningDtoMapper extends DtoMapper<Opening, OpeningResponseDto> {
  toResponse(entity: Opening): OpeningResponseDto {
    const primitives = entity.toPrimitives();
    return new OpeningResponseDto({
      id: primitives.id!,
      name: primitives.name,
      cases: primitives.openingCases.map((oc) => ({
        caseId: oc.case.id!,
        caseName: oc.case.name,
        casePrice: oc.case.price,
        resultSkinId: oc.resultSkin.id!,
        resultSkinName: oc.resultSkin.name,
      })),
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  toResponseList(entities: Opening[]): OpeningResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}
