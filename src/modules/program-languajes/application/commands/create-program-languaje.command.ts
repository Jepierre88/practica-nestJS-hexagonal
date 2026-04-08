import { DifficultyLevel } from '@program-languajes/domain/value-objects/difficulty-level.vo';

export interface CreateProgramLanguajeCommand {
  readonly name: string;
  readonly description: string;
  readonly difficulty?: DifficultyLevel;
}
