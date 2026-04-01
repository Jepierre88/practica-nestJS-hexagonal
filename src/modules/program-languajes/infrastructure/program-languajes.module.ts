import { Module } from "@nestjs/common";
import { ProgramLanguajesController } from "./adapters/in/rest/program-languajes.controller";
import { CreateProgramLanguajeUseCase } from "../application/ports/in/create-program-languaje.port";
import { TypeOrmProgramLanguajeRepository } from "./adapters/out/persistence/typeorm/repositories/typeorm-program-languaje.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProgramLanguajeEntity } from "./adapters/out/persistence/typeorm/entities/program-languaje.entity";
import { CreateProgramLanguajeService } from "@program-languajes/application/usecases/create-program-languaje.service";
import { ProgramLanguajeRepositoryPort } from "@program-languajes/application/ports/out/program-languaje-repository.port";

@Module({
    imports: [TypeOrmModule.forFeature([ProgramLanguajeEntity])],
    controllers: [ProgramLanguajesController],
    providers: [
        {
            provide: CreateProgramLanguajeUseCase,
            useClass: CreateProgramLanguajeService
        },
        {
            provide: ProgramLanguajeRepositoryPort,
            useClass: TypeOrmProgramLanguajeRepository
        }
    ]
})
export class ProgramLanguajesModule {}