import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCaseDto {
  @ApiPropertyOptional({ example: 'Revolution Case' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional({ example: 3.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;
}
