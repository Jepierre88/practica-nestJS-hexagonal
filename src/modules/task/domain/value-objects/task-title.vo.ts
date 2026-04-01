import { InvalidTaskTitleException } from '@task/domain/exceptions/domain.exception';

export class TaskTitle {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 150;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): TaskTitle {
    const trimmed = value.trim();
    if (
      trimmed.length < TaskTitle.MIN_LENGTH ||
      trimmed.length > TaskTitle.MAX_LENGTH
    ) {
      throw new InvalidTaskTitleException(value);
    }
    return new TaskTitle(trimmed);
  }

  get value(): string {
    return this._value;
  }

  equals(other: TaskTitle): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
