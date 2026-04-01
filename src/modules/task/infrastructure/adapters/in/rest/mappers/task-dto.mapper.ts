import { Task } from '@task/domain/models/task.model';
import { TaskResponseDto } from '@task/infrastructure/adapters/in/rest/dtos/task-response.dto';

export class TaskDtoMapper {
  static toResponse(task: Task): TaskResponseDto {
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

  static toResponseList(tasks: Task[]): TaskResponseDto[] {
    return tasks.map(TaskDtoMapper.toResponse);
  }
}
