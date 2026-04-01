import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
