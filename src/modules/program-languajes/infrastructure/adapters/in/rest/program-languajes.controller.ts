import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateProgramLanguajeUseCase } from "@program-languajes/application/ports/in/create-program-languaje.port";
import { CreateProgramLanguajeDto } from "./dtos/create-program-languaje.dto";

@Controller("program-languajes")
export class ProgramLanguajesController {
  constructor(
    @Inject(CreateProgramLanguajeUseCase) private readonly createProgramLanguajeUseCase: CreateProgramLanguajeUseCase,
  ) {}
  @Post("create")
  async create(
    @Body() createProgramLanguajeDto: CreateProgramLanguajeDto
  ) {
    return this.createProgramLanguajeUseCase.execute(createProgramLanguajeDto)
  }
}