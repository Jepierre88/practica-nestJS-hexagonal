import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Jane',
    description: 'Nuevo nombre',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name?: string;

  @ApiPropertyOptional({
    example: 'Smith',
    description: 'Nuevo apellido',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly lastName?: string;

  @ApiPropertyOptional({
    example: 'jane.smith@example.com',
    description: 'Nuevo email',
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
