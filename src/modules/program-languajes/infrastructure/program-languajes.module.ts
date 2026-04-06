import { Module } from '@nestjs/common';
import { ProgramLanguajesController } from './adapters/in/rest/program-languajes.controller';
import { CreateProgramLanguajeUseCase } from '../application/ports/in/create-program-languaje.port';
import { TypeOrmProgramLanguajeRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-program-languaje.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramLanguajeEntity } from './adapters/out/persistence/typeorm/entities/program-languaje.entity';
import { CreateProgramLanguajeService } from '@program-languajes/application/usecases/create-program-languaje.service';
import { ProgramLanguajeRepositoryPort } from '@program-languajes/application/ports/out/program-languaje-repository.port';
import { ListProgramLanguajesService } from '@program-languajes/application/usecases/list-program-languajes.service';
import { ListProgramLanguajesUseCase } from '@program-languajes/application/ports/in/list-program-languajes.port';
import { EditProgramLanguajeUseCase } from '@program-languajes/application/ports/in/edit-program-languaje.port';
import { EditProgramLanguajeService } from '@program-languajes/application/usecases/edit-program-languaje.service';
import { ProgramLanguajePersistenceMapper } from './adapters/out/persistence/typeorm/mappers/program-languaje-persistence.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramLanguajeEntity])],
  controllers: [ProgramLanguajesController],
  providers: [
    // ─── Mappers ───────────────────────────────────────────
    ProgramLanguajePersistenceMapper,

    // ─── Ports → Adapters ──────────────────────────────────
    {
      provide: CreateProgramLanguajeUseCase,
      useClass: CreateProgramLanguajeService,
    },
    {
      provide: ProgramLanguajeRepositoryPort,
      useClass: TypeOrmProgramLanguajeRepository,
    },
    {
      provide: ListProgramLanguajesUseCase,
      useClass: ListProgramLanguajesService,
    },
    {
      provide: EditProgramLanguajeUseCase,
      useClass: EditProgramLanguajeService,
    },
  ],
})
export class ProgramLanguajesModule {}
