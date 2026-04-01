import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProgramLanguajeRepositoryPort } from "src/modules/program-languajes/application/ports/out/program-languaje-repository.port";
import { ProgramLanguaje } from "src/modules/program-languajes/domain/models/program-languaje.model";
import { ProgramLanguajeEntity } from "../entities/program-languaje.entity";
import { Repository } from "typeorm";
import { ProgramLanguajePersistenceMapper } from "../mappers/program-languaje-persistence.mapper";

@Injectable()
export class TypeOrmProgramLanguajeRepository implements  ProgramLanguajeRepositoryPort {

  constructor(
    @InjectRepository(ProgramLanguajeEntity) private readonly repository: Repository<ProgramLanguajeEntity>
  ) {}

  async create(entity: ProgramLanguaje): Promise<ProgramLanguaje> {
    const ormEntity = ProgramLanguajePersistenceMapper.toOrm(entity);
    const savedEntity = await this.repository.save(ormEntity);
    return ProgramLanguajePersistenceMapper.toDomain(savedEntity);
  }
  async findById(id: string): Promise<ProgramLanguaje | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<ProgramLanguaje[]> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, entity: ProgramLanguaje): Promise<ProgramLanguaje> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<ProgramLanguaje | null> {
    const ormEntity = await this.repository.findOne({ where: { name } });
    return ormEntity ? ProgramLanguajePersistenceMapper.toDomain(ormEntity) : null;
  }

  async findByDifficulty(difficulty: number): Promise<ProgramLanguaje[]> {
    const ormEntities = await this.repository.find({
      where: { difficulty }
    })
    return ormEntities.map(ProgramLanguajePersistenceMapper.toDomain)
  }
  
}