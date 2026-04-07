import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ example: 'Kilowatt Collection', minLength: 2, maxLength: 150 })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name: string;
}
