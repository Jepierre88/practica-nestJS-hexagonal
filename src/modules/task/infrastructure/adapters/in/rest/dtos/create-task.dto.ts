import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  readonly title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}
