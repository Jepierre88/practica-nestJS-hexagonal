import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWeaponDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name: string;
}
