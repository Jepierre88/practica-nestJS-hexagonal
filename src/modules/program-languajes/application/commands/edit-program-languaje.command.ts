import { DifficultyLevel } from "@program-languajes/domain/value-objects/difficulty-level.vo";

interface EditProgramLanguajeCommandProps {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly difficulty?: DifficultyLevel;
}
export class EditProgramLanguajeCommand {
  private props: EditProgramLanguajeCommandProps;

  private constructor(
    props: EditProgramLanguajeCommandProps
  ) {
    this.props = props;
  }

  static create(props: EditProgramLanguajeCommandProps): EditProgramLanguajeCommand {
    return new EditProgramLanguajeCommand(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string | undefined {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get difficulty(): DifficultyLevel | undefined {
    return this.props.difficulty;
  }

}