import { DbSchemas } from "@shared/schemas";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { DifficultyLevel } from "@program-languajes/domain/value-objects/difficulty-level.vo";

@Entity("program_languajes", { schema: DbSchemas.Tech })
@Unique("UQ_PROGRAM_LANGUAJE_NAME", ["name"])
export class ProgramLanguajeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
  
  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: DifficultyLevel, nullable: true })
  difficulty?: DifficultyLevel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}