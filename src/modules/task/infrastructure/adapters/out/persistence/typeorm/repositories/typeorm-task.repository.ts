import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@task/domain/models/task.model';
import { TaskRepositoryPort } from '@task/application/ports/out/task-repository.port';
import { TaskOrmEntity } from '@task/infrastructure/adapters/out/persistence/typeorm/entities/task-orm.entity';
import { TaskPersistenceMapper } from '@task/infrastructure/adapters/out/persistence/typeorm/mappers/task-persistence.mapper';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepositoryPort {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly ormRepository: Repository<TaskOrmEntity>,
  ){}

  async save(task: Task): Promise<Task> {
    const ormEntity = TaskPersistenceMapper.toOrm(task);
    const saved = await this.ormRepository.save(ormEntity);
    return TaskPersistenceMapper.toDomain(saved);
  }

  async findAll(): Promise<Task[]> {
    const entities = await this.ormRepository.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map(TaskPersistenceMapper.toDomain);
  }

  async findById(id: string): Promise<Task | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    return entity ? TaskPersistenceMapper.toDomain(entity) : null;
  }

  async update(task: Task): Promise<Task> {
    const ormEntity = TaskPersistenceMapper.toOrm(task);
    const saved = await this.ormRepository.save(ormEntity);
    return TaskPersistenceMapper.toDomain(saved);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async existsById(id: string): Promise<boolean> {
    return this.ormRepository.existsBy({ id });
  }
}
