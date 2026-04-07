import { IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSkinDto {
  @ApiPropertyOptional({ example: 'Dragon Lore' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional({ example: 850.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @ApiPropertyOptional({ example: 0.01 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly skinFloat?: number;

  @ApiPropertyOptional({ example: 'uuid' })
  @IsOptional()
  @IsUUID()
  readonly weaponId?: string;

  @ApiPropertyOptional({ example: 'uuid' })
  @IsOptional()
  @IsUUID()
  readonly collectionId?: string;
}
