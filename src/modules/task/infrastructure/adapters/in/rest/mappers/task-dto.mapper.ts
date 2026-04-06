import { Injectable } from '@nestjs/common';
import { DtoMapper } from '@shared/infrastructure/mappers/dto-mapper.interface';
import { Task } from '@task/domain/models/task.model';
import { TaskResponseDto } from '@task/infrastructure/adapters/in/rest/dtos/task-response.dto';

@Injectable()
export class TaskDtoMapper implements DtoMapper<Task, TaskResponseDto> {
  toResponse(task: Task): TaskResponseDto {
    const primitives = task.toPrimitives();
    return new TaskResponseDto({
      id: primitives.id!,
      title: primitives.title,
      description: primitives.description,
      status: primitives.status,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  toResponseList(domains: Task[]): TaskResponseDto[] {
    return domains.map((d) => this.toResponse(d));
  }
}
