import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Seeder } from './seeder.interface';
import { TaskOrmEntity } from '@task/infrastructure/adapters/out/persistence/typeorm/entities/task-orm.entity';

export class TaskSeeder implements Seeder {
  readonly name = 'TaskSeeder';

  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(TaskOrmEntity);

    const count = await repo.count();
    if (count > 0) {
      console.log(`  ⏭  ${this.name}: tabla ya tiene datos, saltando.`);
      return;
    }

    const tasks: Partial<TaskOrmEntity>[] = [
      {
        id: uuidv4(),
        title: 'Configurar proyecto NestJS',
        description: 'Instalar dependencias y configurar TypeORM',
        status: 'DONE',
      },
      {
        id: uuidv4(),
        title: 'Implementar arquitectura hexagonal',
        description: 'Crear capas de dominio, aplicación e infraestructura',
        status: 'IN_PROGRESS',
      },
      {
        id: uuidv4(),
        title: 'Escribir tests unitarios',
        description: 'Cubrir use cases y value objects',
        status: 'PENDING',
      },
      {
        id: uuidv4(),
        title: 'Configurar CI/CD',
        description: '',
        status: 'PENDING',
      },
    ];

    await repo.save(tasks);
    console.log(`  ✅ ${this.name}: ${tasks.length} tareas insertadas.`);
  }
}
