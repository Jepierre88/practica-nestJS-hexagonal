import { ProgramLanguaje } from "@program-languajes/domain/models/program-languaje.model";
import { ProgramLanguajeEntity } from "../entities/program-languaje.entity";

export class ProgramLanguajePersistenceMapper {
  static toOrm(domain: ProgramLanguaje): ProgramLanguajeEntity {
    const domainPrimitives = domain.toPrimitives();
    const orm = new ProgramLanguajeEntity();
    domainPrimitives.id && (orm.id = domainPrimitives.id);
    orm.name = domainPrimitives.name;
    orm.description = domainPrimitives.description;
    orm.difficulty = domainPrimitives.difficulty;
    return orm;
  }

  static toDomain(orm: ProgramLanguajeEntity): ProgramLanguaje {
    return ProgramLanguaje.reconstruct({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      difficulty: orm.difficulty,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}