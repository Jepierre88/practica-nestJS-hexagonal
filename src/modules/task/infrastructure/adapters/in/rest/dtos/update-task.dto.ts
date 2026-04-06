import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatusEnum } from '@task/domain/value-objects/task-status.vo';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Comprar pan',
    description: 'Nuevo título',
    minLength: 3,
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  readonly title?: string;

  @ApiPropertyOptional({
    example: 'En la panadería de la esquina',
    description: 'Nueva descripción',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;

  @ApiPropertyOptional({
    example: 'IN_PROGRESS',
    enum: TaskStatusEnum,
    description: 'Nuevo estado de la tarea',
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum, {
    message: `status must be one of: ${Object.values(TaskStatusEnum).join(', ')}`,
  })
  readonly status?: TaskStatusEnum;
}
