import { User } from '@users/domain/models/user.model';
import { UserResponseDto } from '@users/infrastructure/adapters/in/rest/dtos/user-response.dto';

export class UserDtoMapper {
  static toResponse(domain: User): UserResponseDto {
    const p = domain.toPrimitives();
    return {
      id: p.id!,
      name: p.name,
      lastName: p.lastName,
      email: p.email,
      createdAt: p.createdAt!.toISOString(),
      updatedAt: p.updatedAt!.toISOString(),
    };
  }
}
