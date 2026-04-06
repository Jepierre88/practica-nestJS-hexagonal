import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Domain — no se registra, no tiene decoradores de DI

// Application — Ports (clases abstractas usadas como tokens)
import { CreateTaskUseCase } from '@task/application/ports/in/create-task.port';
import { FindTasksUseCase } from '@task/application/ports/in/find-tasks.port';
import { UpdateTaskUseCase } from '@task/application/ports/in/update-task.port';
import { DeleteTaskUseCase } from '@task/application/ports/in/delete-task.port';
import { TaskRepositoryPort } from '@task/application/ports/out/task-repository.port';

// Application — Use Cases (implementaciones concretas)
import { CreateTaskService } from '@task/application/usecases/create-task.service';
import { FindTasksService } from '@task/application/usecases/find-tasks.service';
import { UpdateTaskService } from '@task/application/usecases/update-task.service';
import { DeleteTaskService } from '@task/application/usecases/delete-task.service';

// Infrastructure — Persistence
import { TaskOrmEntity } from './adapters/out/persistence/typeorm/entities/task-orm.entity';
import { TypeOrmTaskRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-task.repository';
import { TaskPersistenceMapper } from './adapters/out/persistence/typeorm/mappers/task-persistence.mapper';

// Infrastructure — REST
import { TaskController } from './adapters/in/rest/task.controller';
import { TaskDtoMapper } from './adapters/in/rest/mappers/task-dto.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TaskController],
  providers: [
    // ─── Mapper ──────────────────────────────────────────────
    TaskPersistenceMapper,
    TaskDtoMapper,

    // ─── Output Port → Adapter de persistencia ───────────────
    {
      provide: TaskRepositoryPort,
      useClass: TypeOrmTaskRepository,
    },

    // ─── Input Ports → Use Cases ─────────────────────────────
    {
      provide: CreateTaskUseCase,
      useClass: CreateTaskService,
    },
    {
      provide: FindTasksUseCase,
      useClass: FindTasksService,
    },
    {
      provide: UpdateTaskUseCase,
      useClass: UpdateTaskService,
    },
    {
      provide: DeleteTaskUseCase,
      useClass: DeleteTaskService,
    },
  ],
})
export class TaskModule {}
