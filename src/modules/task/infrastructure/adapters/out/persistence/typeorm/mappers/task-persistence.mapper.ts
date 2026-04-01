import { Task } from '@task/domain/models/task.model';
import { TaskOrmEntity } from '@task/infrastructure/adapters/out/persistence/typeorm/entities/task-orm.entity';

export class TaskPersistenceMapper {
  static toDomain(entity: TaskOrmEntity): Task {
    return Task.reconstruct({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toOrm(task: Task): TaskOrmEntity {
    const primitives = task.toPrimitives();
    const entity = new TaskOrmEntity();
    if (primitives.id) {
      entity.id = primitives.id;
    }
    entity.title = primitives.title;
    entity.description = primitives.description;
    entity.status = primitives.status;
    return entity;
  }
}
