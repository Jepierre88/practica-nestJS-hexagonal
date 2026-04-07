import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkinDto {
  @ApiProperty({ example: 'Asiimov' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name: string;

  @ApiProperty({ example: 45.99, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({ example: 0.15, minimum: 0, description: 'Float value (desgaste) del skin' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly skinFloat: number;

  @ApiProperty({ example: 'uuid', description: 'ID del arma' })
  @IsNotEmpty()
  @IsUUID()
  readonly weaponId: string;

  @ApiProperty({ example: 'uuid', description: 'ID de la colección' })
  @IsNotEmpty()
  @IsUUID()
  readonly collectionId: string;
}
