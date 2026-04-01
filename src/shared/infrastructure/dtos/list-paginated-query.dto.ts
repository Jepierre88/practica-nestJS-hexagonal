import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListPaginatedQueryDto {
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit: number = 10;

  @IsOptional()
  @IsString()
  readonly orderBy?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  readonly order?: 'ASC' | 'DESC';
}
