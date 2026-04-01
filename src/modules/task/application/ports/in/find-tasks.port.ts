import { Task } from '@task/domain/models/task.model';

export abstract class FindTasksUseCase {
  abstract findAll(): Promise<Task[]>;
  abstract findById(id: string): Promise<Task>;
}
