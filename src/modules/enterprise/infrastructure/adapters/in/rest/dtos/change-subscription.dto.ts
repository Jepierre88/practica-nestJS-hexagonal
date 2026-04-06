import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ESubscriptionType } from '@enterprise/domain/enums/subscription-type.enum';

export class ChangeSubscriptionDto {
  @ApiProperty({
    description: 'UUID v4 del usuario',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly userId!: string;

  @ApiProperty({
    enum: ESubscriptionType,
    description: 'Nuevo plan de suscripción',
    example: ESubscriptionType.Pro,
  })
  @IsNotEmpty()
  @IsEnum(ESubscriptionType)
  readonly newPlan!: ESubscriptionType;
}
