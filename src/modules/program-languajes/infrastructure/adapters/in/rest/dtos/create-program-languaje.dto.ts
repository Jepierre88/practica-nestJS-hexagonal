import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { DifficultyLevel } from "@program-languajes/domain/value-objects/difficulty-level.vo";

export class CreateProgramLanguajeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  readonly name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly description: string;

  @IsOptional()
  @IsEnum(DifficultyLevel, {
    message: `Difficulty must be one of: ${Object.values(DifficultyLevel).filter(v => typeof v === 'number').join(', ')}`,
  })
  readonly difficulty?: DifficultyLevel;
}