import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatusEnum } from '@task/domain/value-objects/task-status.vo';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  readonly title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum, {
    message: `status must be one of: ${Object.values(TaskStatusEnum).join(', ')}`,
  })
  readonly status?: TaskStatusEnum;
}
