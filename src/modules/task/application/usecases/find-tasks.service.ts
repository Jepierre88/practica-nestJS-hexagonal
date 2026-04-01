import { Injectable } from '@nestjs/common';
import { Task } from '@task/domain/models/task.model';
import { TaskNotFoundException } from '@task/domain/exceptions/domain.exception';
import { FindTasksUseCase } from '@task/application/ports/in/find-tasks.port';
import { TaskRepositoryPort } from '@task/application/ports/out/task-repository.port';

@Injectable()
export class FindTasksService implements FindTasksUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }
}
