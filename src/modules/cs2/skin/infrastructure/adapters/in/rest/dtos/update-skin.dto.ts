import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSkinDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name?: string;
}
