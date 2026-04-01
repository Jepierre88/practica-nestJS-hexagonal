import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { CreateProgramLanguajeUseCase } from "@program-languajes/application/ports/in/create-program-languaje.port";
import { CreateProgramLanguajeDto } from "./dtos/create-program-languaje.dto";
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';
import { ListProgramLanguajesUseCase } from "@program-languajes/application/ports/in/list-program-languajes.port";
import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";

@Controller("program-languajes")
export class ProgramLanguajesController {
  constructor(
    @Inject(CreateProgramLanguajeUseCase) private readonly createProgramLanguajeUseCase: CreateProgramLanguajeUseCase,
    @Inject(ListProgramLanguajesUseCase) private readonly listProgramLanguajesUseCase: ListProgramLanguajesUseCase,
  ) {}
  @Post("create")
  @ResponseMessage('Program language created successfully')
  async create(
    @Body() createProgramLanguajeDto: CreateProgramLanguajeDto
  ) {
    const programLanguaje = await this.createProgramLanguajeUseCase.execute(createProgramLanguajeDto);
    return programLanguaje.toPrimitives();
  }

  @Post("list")
  @ResponseMessage('Program languages listed successfully')
  async list(@Param() params: ListPaginatedCommand) {
    const programLanguajes = await this.listProgramLanguajesUseCase.execute(params);
    return programLanguajes.toPrimitives();
  }

}