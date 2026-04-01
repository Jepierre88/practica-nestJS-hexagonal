import { InvalidTaskDescriptionException } from '@task/domain/exceptions/domain.exception';

export class TaskDescription {
  private static readonly MAX_LENGTH = 500;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): TaskDescription {
    const trimmed = value.trim();
    if (trimmed.length > TaskDescription.MAX_LENGTH) {
      throw new InvalidTaskDescriptionException();
    }
    return new TaskDescription(trimmed);
  }

  static empty(): TaskDescription {
    return new TaskDescription('');
  }

  get value(): string {
    return this._value;
  }

  get isEmpty(): boolean {
    return this._value.length === 0;
  }

  equals(other: TaskDescription): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
