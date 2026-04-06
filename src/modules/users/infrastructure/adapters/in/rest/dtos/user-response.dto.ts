import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  readonly id!: string;

  @ApiProperty({ example: 'John' })
  readonly name!: string;

  @ApiProperty({ example: 'Doe' })
  readonly lastName!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  readonly email!: string;

  @ApiPropertyOptional({
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    description: 'UUID de la suscripción asignada',
  })
  readonly subscriptionId?: string;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  readonly createdAt!: string;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  readonly updatedAt!: string;
}
