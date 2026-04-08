import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ListFilteredPaginatedQueryDto {
  @ApiProperty({ default: 1, minimum: 1, description: 'Número de página' })
  @IsInt()
  @Min(1)
  readonly page!: number = 1;

  @ApiProperty({
    default: 10,
    minimum: 1,
    maximum: 100,
    description: 'Elementos por página',
  })
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit!: number = 10;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  readonly orderBy?: string;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC'],
    description: 'Dirección del ordenamiento',
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  readonly order?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'Texto de búsqueda (ILIKE en campos configurados)',
    example: 'typescript',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
