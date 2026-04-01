import { DifficultyLevel } from "@program-languajes/domain/value-objects/difficulty-level.vo";

interface CreateProgramLanguajeCommandProps {
  readonly name: string;
  readonly description: string;
  readonly difficulty?: DifficultyLevel;
}

export class CreateProgramLanguajeCommand {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly difficulty?: DifficultyLevel,
  ) {}

  static create(props: CreateProgramLanguajeCommandProps): CreateProgramLanguajeCommand {
    return new CreateProgramLanguajeCommand(props.name, props.description, props.difficulty);
  }
}