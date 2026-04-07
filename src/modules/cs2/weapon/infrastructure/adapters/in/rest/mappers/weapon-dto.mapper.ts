import { Weapon } from '@cs2/weapon/domain/models/weapon.model';
import { WeaponResponseDto } from '../dtos/weapon-response.dto';

export class WeaponDtoMapper {
  static toResponse(entity: Weapon): WeaponResponseDto {
    const primitives = entity.toPrimitives();
    return new WeaponResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  static toResponseList(entities: Weapon[]): WeaponResponseDto[] {
    return entities.map(WeaponDtoMapper.toResponse);
  }
}
