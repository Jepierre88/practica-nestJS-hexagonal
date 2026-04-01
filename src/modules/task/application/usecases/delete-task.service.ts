import { Injectable } from '@nestjs/common';
import { TaskNotFoundException } from '@task/domain/exceptions/domain.exception';
import { DeleteTaskUseCase } from '@task/application/ports/in/delete-task.port';
import { TaskRepositoryPort } from '@task/application/ports/out/task-repository.port';

@Injectable()
export class DeleteTaskService implements DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const exists = await this.taskRepository.existsById(id);
    if (!exists) {
      throw new TaskNotFoundException(id);
    }
    await this.taskRepository.deleteById(id);
  }
}
