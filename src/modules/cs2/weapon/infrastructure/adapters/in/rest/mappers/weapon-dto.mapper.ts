import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { WeaponResponseDto } from '../dtos/weapon-response.dto';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';

export class WeaponDtoMapper extends DtoMapper<Weapon, WeaponResponseDto> {
  toResponse(entity: Weapon): WeaponResponseDto {
    const primitives = entity.toPrimitives();
    return new WeaponResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  toResponseList(entities: Weapon[]): WeaponResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}
