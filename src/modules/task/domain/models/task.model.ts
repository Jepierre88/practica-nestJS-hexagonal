import { TaskId } from '@task/domain/value-objects/task-id.vo';
import { TaskTitle } from '@task/domain/value-objects/task-title.vo';
import { TaskDescription } from '@task/domain/value-objects/task-description.vo';
import { TaskStatus, TaskStatusEnum } from '@task/domain/value-objects/task-status.vo';
import { DomainModel } from '@shared/domain/models/domain.model';

export interface TaskProps {
  readonly id?: TaskId;
  readonly title: TaskTitle;
  readonly description: TaskDescription;
  readonly status: TaskStatus;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateTaskProps {
  readonly title: string;
  readonly description?: string;
}

export interface ReconstructTaskProps {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class Task extends DomainModel {
  private readonly props: TaskProps;

  private constructor(props: TaskProps) {
    super();
    this.props = props;
  }

  /**
   * Factory: crea una nueva Task desde datos primitivos.
   * Aplica validaciones a través de los Value Objects.
   */
  static create(input: CreateTaskProps): Task {
    return new Task({
      title: TaskTitle.create(input.title),
      description: input.description
        ? TaskDescription.create(input.description)
        : TaskDescription.empty(),
      status: TaskStatus.pending(),
    });
  }

  /**
   * Factory: reconstruye una Task desde los datos de persistencia.
   * No aplica reglas de negocio de creación, pero sí valida formatos.
   */
  static reconstruct(input: ReconstructTaskProps): Task {
    return new Task({
      id: TaskId.fromString(input.id),
      title: TaskTitle.create(input.title),
      description: input.description
        ? TaskDescription.create(input.description)
        : TaskDescription.empty(),
      status: TaskStatus.fromString(input.status),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }

  // ─── Getters ──────────────────────────────────────────────

  get id(): TaskId | undefined {
    return this.props.id;
  }

  get title(): TaskTitle {
    return this.props.title;
  }

  get description(): TaskDescription {
    return this.props.description;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  // ─── Comportamiento de dominio ────────────────────────────

  changeTitle(newTitle: string): Task {
    return new Task({
      ...this.props,
      title: TaskTitle.create(newTitle),
    });
  }

  changeDescription(newDescription: string): Task {
    return new Task({
      ...this.props,
      description: TaskDescription.create(newDescription),
    });
  }

  changeStatus(newStatus: TaskStatusEnum): Task {
    const targetStatus = TaskStatus.create(newStatus);
    const transitioned = this.props.status.transitionTo(targetStatus);
    return new Task({
      ...this.props,
      status: transitioned,
    });
  }

  markInProgress(): Task {
    return this.changeStatus(TaskStatusEnum.IN_PROGRESS);
  }

  markDone(): Task {
    return this.changeStatus(TaskStatusEnum.DONE);
  }

  cancel(): Task {
    return this.changeStatus(TaskStatusEnum.CANCELLED);
  }

  // ─── Serialización a primitivos ───────────────────────────

  toPrimitives(): {
    id?: string;
    title: string;
    description: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.props.id?.value,
      title: this.props.title.value,
      description: this.props.description.value,
      status: this.props.status.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
