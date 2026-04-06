import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignSubscriptionDto {
  @ApiProperty({
    description: 'UUID v4 del usuario',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly userId!: string;

  @ApiProperty({
    description: 'UUID v4 de la suscripción',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly subscriptionId!: string;
}
