import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWeaponDto {
  @ApiPropertyOptional({ example: 'M4A4', minLength: 2, maxLength: 150 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name?: string;
}
