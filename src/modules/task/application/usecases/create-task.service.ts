import { Injectable } from '@nestjs/common';
import { Task } from '@task/domain/models/task.model';
import {
  CreateTaskUseCase,
  CreateTaskCommand,
} from '@task/application/ports/in/create-task.port';
import { TaskRepositoryPort } from '@task/application/ports/out/task-repository.port';

@Injectable()
export class CreateTaskService implements CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    const task = Task.create({
      title: command.title,
      description: command.description,
    });

    return this.taskRepository.save(task);
  }
}
