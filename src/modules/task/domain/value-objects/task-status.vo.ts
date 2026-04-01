import { InvalidTaskStatusTransitionException } from '@task/domain/exceptions/domain.exception';

export enum TaskStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export class TaskStatus {
  private static readonly VALID_TRANSITIONS: ReadonlyMap<
    TaskStatusEnum,
    ReadonlySet<TaskStatusEnum>
  > = new Map([
    [
      TaskStatusEnum.PENDING,
      new Set([TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.CANCELLED]),
    ],
    [
      TaskStatusEnum.IN_PROGRESS,
      new Set([TaskStatusEnum.DONE, TaskStatusEnum.CANCELLED, TaskStatusEnum.PENDING]),
    ],
    [TaskStatusEnum.DONE, new Set<TaskStatusEnum>()],
    [TaskStatusEnum.CANCELLED, new Set<TaskStatusEnum>()],
  ]);

  private readonly _value: TaskStatusEnum;

  private constructor(value: TaskStatusEnum) {
    this._value = value;
  }

  static create(value: TaskStatusEnum): TaskStatus {
    return new TaskStatus(value);
  }

  static pending(): TaskStatus {
    return new TaskStatus(TaskStatusEnum.PENDING);
  }

  static fromString(value: string): TaskStatus {
    const enumValue = TaskStatusEnum[value as keyof typeof TaskStatusEnum];
    if (enumValue === undefined) {
      throw new Error(
        `Invalid task status: "${value}". Valid values: ${Object.values(TaskStatusEnum).join(', ')}`,
      );
    }
    return new TaskStatus(enumValue);
  }

  canTransitionTo(next: TaskStatus): boolean {
    const allowed = TaskStatus.VALID_TRANSITIONS.get(this._value);
    return allowed?.has(next._value) ?? false;
  }

  transitionTo(next: TaskStatus): TaskStatus {
    if (!this.canTransitionTo(next)) {
      throw new InvalidTaskStatusTransitionException(this._value, next._value);
    }
    return next;
  }

  get value(): TaskStatusEnum {
    return this._value;
  }

  get isPending(): boolean {
    return this._value === TaskStatusEnum.PENDING;
  }

  get isInProgress(): boolean {
    return this._value === TaskStatusEnum.IN_PROGRESS;
  }

  get isDone(): boolean {
    return this._value === TaskStatusEnum.DONE;
  }

  get isCancelled(): boolean {
    return this._value === TaskStatusEnum.CANCELLED;
  }

  equals(other: TaskStatus): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
