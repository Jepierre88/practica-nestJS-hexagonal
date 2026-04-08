import { DifficultyLevel } from '@program-languajes/domain/value-objects/difficulty-level.vo';
import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

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

type ReconstructProgramLanguajeProps = ProgramLanguajeProps;

export interface ProgramLanguaje extends DomainProps<ProgramLanguajeProps> {}
export class ProgramLanguaje extends DomainModel<ProgramLanguajeProps> {
  private constructor(props: ProgramLanguajeProps) {
    super(props);
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
