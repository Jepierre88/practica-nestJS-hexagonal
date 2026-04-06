import { Injectable } from '@nestjs/common';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';
import { ProgramLanguaje } from '@program-languajes/domain/models/program-languaje.model';
import { ProgramLanguajeResponseDto } from '../dtos/program-languaje-response.dto';

@Injectable()
export class ProgramLanguajeDtoMapper implements DtoMapper<
  ProgramLanguaje,
  ProgramLanguajeResponseDto
> {
  toResponse(domain: ProgramLanguaje): ProgramLanguajeResponseDto {
    const p = domain.toPrimitives();
    return {
      id: p.id!,
      name: p.name,
      description: p.description,
      difficulty: p.difficulty,
      createdAt: p.createdAt!.toISOString(),
      updatedAt: p.updatedAt!.toISOString(),
    };
  }

  toResponseList(domains: ProgramLanguaje[]): ProgramLanguajeResponseDto[] {
    return domains.map((d) => this.toResponse(d));
  }
}
