import { CrudRepositoryInterface } from "@shared/domain/interfaces/crud-repository.interface";
import { ProgramLanguaje } from "src/modules/program-languajes/domain/models/program-languaje.model";

export abstract class ProgramLanguajeRepositoryPort implements CrudRepositoryInterface<ProgramLanguaje>{
  abstract create(entity: ProgramLanguaje): Promise<ProgramLanguaje>
  abstract findById(id: string): Promise<ProgramLanguaje | null>
  abstract findAll(): Promise<ProgramLanguaje[]>;
  abstract update(id: string, entity: ProgramLanguaje): Promise<ProgramLanguaje>;
  abstract delete(id: string): Promise<void>;
  abstract findByName(name: string): Promise<ProgramLanguaje | null>;
  abstract findByDifficulty(difficulty: number): Promise<ProgramLanguaje[]>;
} 