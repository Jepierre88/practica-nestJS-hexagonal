import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateProgramLanguajeUseCase } from "@program-languajes/application/ports/in/create-program-languaje.port";
import { CreateProgramLanguajeDto } from "./dtos/create-program-languaje.dto";
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';

@Controller("program-languajes")
export class ProgramLanguajesController {
  constructor(
    @Inject(CreateProgramLanguajeUseCase) private readonly createProgramLanguajeUseCase: CreateProgramLanguajeUseCase,
  ) {}
  @Post("create")
  @ResponseMessage('Program language created successfully')
  async create(
    @Body() createProgramLanguajeDto: CreateProgramLanguajeDto
  ) {
    return this.createProgramLanguajeUseCase.execute(createProgramLanguajeDto)
  }
}