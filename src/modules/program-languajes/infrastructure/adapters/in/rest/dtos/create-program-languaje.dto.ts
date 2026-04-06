import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DifficultyLevel } from '@program-languajes/domain/value-objects/difficulty-level.vo';

export class CreateProgramLanguajeDto {
  @ApiProperty({ example: 'TypeScript', minLength: 2, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  readonly name: string;

  @ApiPropertyOptional({
    example: 'A typed superset of JavaScript',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly description: string;

  @ApiPropertyOptional({
    enum: [1, 2, 3],
    description: '1=EASY, 2=MEDIUM, 3=HARD',
    example: 2,
  })
  @IsOptional()
  @IsEnum(DifficultyLevel, {
    message: `Difficulty must be one of: ${Object.values(DifficultyLevel)
      .filter((v) => typeof v === 'number')
      .join(', ')}`,
  })
  readonly difficulty?: DifficultyLevel;
}
