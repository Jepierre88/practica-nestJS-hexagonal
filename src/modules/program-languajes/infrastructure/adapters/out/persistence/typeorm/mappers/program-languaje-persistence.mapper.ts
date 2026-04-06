import { Injectable } from '@nestjs/common';
import { PersistenceMapper } from '@shared/infrastructure/mappers/persistence-mapper.interface';
import { ProgramLanguaje } from '@program-languajes/domain/models/program-languaje.model';
import { ProgramLanguajeEntity } from '../entities/program-languaje.entity';

@Injectable()
export class ProgramLanguajePersistenceMapper implements PersistenceMapper<
  ProgramLanguaje,
  ProgramLanguajeEntity
> {
  toDomain(orm: ProgramLanguajeEntity): ProgramLanguaje {
    return ProgramLanguaje.reconstruct({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      difficulty: orm.difficulty,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  toOrm(domain: ProgramLanguaje): ProgramLanguajeEntity {
    const domainPrimitives = domain.toPrimitives();
    const orm = new ProgramLanguajeEntity();
    if (domainPrimitives.id) {
      orm.id = domainPrimitives.id;
    }
    orm.name = domainPrimitives.name;
    orm.description = domainPrimitives.description;
    orm.difficulty = domainPrimitives.difficulty;
    return orm;
  }
}
