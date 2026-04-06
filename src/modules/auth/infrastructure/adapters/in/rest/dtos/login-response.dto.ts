import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'JWT access token',
  })
  readonly accessToken: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID del usuario autenticado',
  })
  readonly userId: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del usuario autenticado',
  })
  readonly email: string;
}
