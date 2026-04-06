import { DifficultyLevel } from '@program-languajes/domain/value-objects/difficulty-level.vo';

interface CreateProgramLanguajeCommandProps {
  readonly name: string;
  readonly description: string;
  readonly difficulty?: DifficultyLevel;
}

export class CreateProgramLanguajeCommand {
  private props: CreateProgramLanguajeCommandProps;

  private constructor(props: CreateProgramLanguajeCommandProps) {
    this.props = props;
  }

  static create(
    props: CreateProgramLanguajeCommandProps,
  ): CreateProgramLanguajeCommand {
    return new CreateProgramLanguajeCommand(props);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get difficulty(): DifficultyLevel | undefined {
    return this.props.difficulty;
  }
}
