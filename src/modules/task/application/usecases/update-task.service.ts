import { Injectable } from '@nestjs/common';
import { Task } from '@task/domain/models/task.model';
import { TaskNotFoundException } from '@task/domain/exceptions/domain.exception';
import { TaskStatusEnum } from '@task/domain/value-objects/task-status.vo';
import {
  UpdateTaskUseCase,
  UpdateTaskCommand,
} from '@task/application/ports/in/update-task.port';
import { TaskRepositoryPort } from '@task/application/ports/out/task-repository.port';

@Injectable()
export class UpdateTaskService implements UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(command: UpdateTaskCommand): Promise<Task> {
    const existing = await this.taskRepository.findById(command.id);
    if (!existing) {
      throw new TaskNotFoundException(command.id);
    }

    let updated = existing;

    if (command.title !== undefined) {
      updated = updated.changeTitle(command.title);
    }

    if (command.description !== undefined) {
      updated = updated.changeDescription(command.description);
    }

    if (command.status !== undefined) {
      const targetStatus =
        TaskStatusEnum[command.status as keyof typeof TaskStatusEnum];
      if (targetStatus === undefined) {
        throw new Error(
          `Invalid status: "${command.status}". Valid: ${Object.values(TaskStatusEnum).join(', ')}`,
        );
      }
      updated = updated.changeStatus(targetStatus);
    }

    return this.taskRepository.update(updated);
  }
}
