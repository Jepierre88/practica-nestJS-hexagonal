import { DifficultyLevel } from '@program-languajes/domain/value-objects/difficulty-level.vo';

export interface EditProgramLanguajeCommand {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly difficulty?: DifficultyLevel;
}
