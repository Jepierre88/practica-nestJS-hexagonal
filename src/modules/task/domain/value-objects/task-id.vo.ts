import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class TaskId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(): TaskId {
    return new TaskId(uuidv4());
  }

  static fromString(value: string): TaskId {
    if (!uuidValidate(value)) {
      throw new Error(`Invalid TaskId: "${value}" is not a valid UUID.`);
    }
    return new TaskId(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: TaskId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
