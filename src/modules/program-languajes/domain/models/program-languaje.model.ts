import { DifficultyLevel } from "@program-languajes/domain/value-objects/difficulty-level.vo";
import { DomainModel } from "@shared/domain/models/domain.model";

interface ProgramLanguajeProps {
  readonly id?: string;
  readonly name: string;
  readonly description?: string;
  readonly difficulty?: DifficultyLevel;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

interface CreateProgramLanguajeProps {
  readonly name: string;
  readonly description: string;
  readonly difficulty?: DifficultyLevel;
}

interface ReconstructProgramLanguajeProps extends ProgramLanguajeProps {
}

export class ProgramLanguaje extends DomainModel {
  private readonly props: ProgramLanguajeProps;

  private constructor(props: ProgramLanguajeProps) {
    super();
    this.props = props;
  }

  static create(props: CreateProgramLanguajeProps): ProgramLanguaje {
    return new ProgramLanguaje(props);
  }

  static reconstruct(props: ReconstructProgramLanguajeProps): ProgramLanguaje {
    return new ProgramLanguaje(props);
  }

  toPrimitives() {
    return {
      id: this.props.id?.toString(),
      name: this.props.name.toString(),
      description: this.props.description?.toString(),
      difficulty: this.props.difficulty,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
  
}