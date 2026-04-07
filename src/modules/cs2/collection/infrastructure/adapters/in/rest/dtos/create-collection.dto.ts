import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name: string;
}
