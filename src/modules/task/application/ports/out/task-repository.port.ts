import { Task } from '@task/domain/models/task.model';

export abstract class TaskRepositoryPort {
  abstract save(task: Task): Promise<Task>;
  abstract findAll(): Promise<Task[]>;
  abstract findById(id: string): Promise<Task | null>;
  abstract update(task: Task): Promise<Task>;
  abstract deleteById(id: string): Promise<void>;
  abstract existsById(id: string): Promise<boolean>;
}
