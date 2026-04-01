import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { CreateProgramLanguajeUseCase } from "@program-languajes/application/ports/in/create-program-languaje.port";
import { CreateProgramLanguajeDto } from "./dtos/create-program-languaje.dto";
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';
import { ListProgramLanguajesUseCase } from "@program-languajes/application/ports/in/list-program-languajes.port";
import { ListPaginatedCommand } from "@shared/application/commands/list-paginated.command";
import { ListPaginatedQueryDto } from "@shared/infrastructure/dtos/list-paginated-query.dto";

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

  @Get("list")
  @ResponseMessage('Program languages listed successfully')
  async list(@Query() query: ListPaginatedQueryDto) {
    const command = ListPaginatedCommand.create(query);
    const programLanguajes = await this.listProgramLanguajesUseCase.execute(command);
    return programLanguajes.toPrimitives();
  }

}