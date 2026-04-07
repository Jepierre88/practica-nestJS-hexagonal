import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCaseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name: string;
}
