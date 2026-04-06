import { Injectable } from '@nestjs/common';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';
import { User } from '@users/domain/models/user.model';
import { UserResponseDto } from '@users/infrastructure/adapters/in/rest/dtos/user-response.dto';

@Injectable()
export class UserDtoMapper implements DtoMapper<User, UserResponseDto> {
  toResponse(domain: User): UserResponseDto {
    const p = domain.toPrimitives();
    return {
      id: p.id!,
      name: p.name,
      lastName: p.lastName,
      email: p.email,
      subscriptionId: p.subscriptionId,
      createdAt: p.createdAt!.toISOString(),
      updatedAt: p.updatedAt!.toISOString(),
    };
  }

  toResponseList(domains: User[]): UserResponseDto[] {
    return domains.map((d) => this.toResponse(d));
  }
}
