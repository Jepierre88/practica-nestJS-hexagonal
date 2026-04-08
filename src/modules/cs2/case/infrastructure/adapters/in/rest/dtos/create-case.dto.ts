import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CaseSkinWithRateDto {
  @ApiProperty({ example: 'uuid', description: 'ID del skin' })
  @IsNotEmpty()
  @IsUUID()
  readonly skinId!: string;

  @ApiProperty({
    example: 25.5,
    minimum: 0,
    maximum: 100,
    description: 'Porcentaje de drop rate',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly dropRate!: number;
}

export class CreateCaseDto {
  @ApiProperty({ example: 'Kilowatt Case', minLength: 2, maxLength: 150 })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name!: string;

  @ApiPropertyOptional({
    example: 2.5,
    minimum: 0,
    description:
      'Modo "price": precio de la caja. Drop rates se auto-calculan.',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ValidateIf((o: CreateCaseDto) => !o.skins || o.price !== undefined)
  readonly price?: number;

  @ApiPropertyOptional({
    type: [String],
    example: ['uuid-1', 'uuid-2'],
    description: 'Modo "price": IDs de los skins.',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ValidateIf((o: CreateCaseDto) => !o.skins)
  readonly skinIds?: string[];

  @ApiPropertyOptional({
    type: [CaseSkinWithRateDto],
    description: 'Modo "rates": skins con drop rates. Precio se auto-calcula.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaseSkinWithRateDto)
  @ValidateIf((o: CreateCaseDto) => !o.price && !o.skinIds)
  readonly skins?: CaseSkinWithRateDto[];
}
