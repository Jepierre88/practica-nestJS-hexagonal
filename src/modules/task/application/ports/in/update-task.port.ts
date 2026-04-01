import { Task } from '@task/domain/models/task.model';

export interface UpdateTaskCommand {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly status?: string;
}

export abstract class UpdateTaskUseCase {
  abstract execute(command: UpdateTaskCommand): Promise<Task>;
}
