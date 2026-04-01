import { Task } from "@task/domain/models/task.model";

export interface CreateTaskCommand {
  readonly title: string;
  readonly description?: string;
}

export abstract class CreateTaskUseCase {
  abstract execute(command: CreateTaskCommand): Promise<Task>;
}
