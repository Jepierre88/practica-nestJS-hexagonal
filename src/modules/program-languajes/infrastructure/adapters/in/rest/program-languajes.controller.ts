import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CreateProgramLanguajeUseCase } from '@program-languajes/application/ports/in/create-program-languaje.port';
import { CreateProgramLanguajeDto } from './dtos/create-program-languaje.dto';
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';
import { ListProgramLanguajesUseCase } from '@program-languajes/application/ports/in/list-program-languajes.port';
import { ListFilteredPaginatedCommand } from '@shared/application/commands/list-filtered-paginated.command';
import { ListFilteredPaginatedQueryDto } from '@shared/infrastructure/dtos/list-filtered-paginated-query.dto';
import { CreateProgramLanguajeCommand } from '@program-languajes/application/commands/create-program-languaje.command';
import { EditProgramLanguajeDto } from './dtos/edit-program-languaje.dto';
import { EditProgramLanguajeUseCase } from '@program-languajes/application/ports/in/edit-program-languaje.port';
import { EditProgramLanguajeCommand } from '@program-languajes/application/commands/edit-program-languaje.command';

@ApiTags('Program Languages')
@ApiBearerAuth('JWT')
@Controller('program-languajes')
export class ProgramLanguajesController {
  constructor(
    @Inject(CreateProgramLanguajeUseCase)
    private readonly createProgramLanguajeUseCase: CreateProgramLanguajeUseCase,
    @Inject(ListProgramLanguajesUseCase)
    private readonly listProgramLanguajesUseCase: ListProgramLanguajesUseCase,
    @Inject(EditProgramLanguajeUseCase)
    private readonly editProgramLanguajeUseCase: EditProgramLanguajeUseCase,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Crear lenguaje de programación',
    description:
      'Registra un nuevo lenguaje con nombre, descripción y dificultad',
  })
  @ApiResponse({ status: 201, description: 'Lenguaje creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ResponseMessage('Program language created successfully')
  async create(@Body() createProgramLanguajeDto: CreateProgramLanguajeDto) {
    const command = CreateProgramLanguajeCommand.create(
      createProgramLanguajeDto,
    );
    const programLanguaje =
      await this.createProgramLanguajeUseCase.execute(command);
    return programLanguaje.toPrimitives();
  }

  @Get('list')
  @ApiOperation({
    summary: 'Listar lenguajes de programación',
    description: 'Lista paginada con filtros, búsqueda y ordenamiento',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de lenguajes' })
  @ResponseMessage('Program languages listed successfully')
  async list(@Query() query: ListFilteredPaginatedQueryDto) {
    const { search, orderBy, order, page, limit, ...rest } = query;
    const command = ListFilteredPaginatedCommand.create({
      page,
      limit,
      orderBy,
      order,
      search,
      filters: rest,
    });
    const programLanguajes =
      await this.listProgramLanguajesUseCase.execute(command);
    return programLanguajes.toPrimitives();
  }

  @Patch('edit/:id')
  @ApiOperation({
    summary: 'Editar lenguaje de programación',
    description: 'Actualiza nombre, descripción o dificultad',
  })
  @ApiParam({ name: 'id', description: 'UUID v4 del lenguaje' })
  @ApiResponse({ status: 200, description: 'Lenguaje actualizado' })
  @ApiResponse({ status: 404, description: 'Lenguaje no encontrado' })
  @ResponseMessage('Program language updated successfully')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
    @Body() editProgramLanguajeDto: EditProgramLanguajeDto,
  ) {
    const command = EditProgramLanguajeCommand.create({
      id,
      ...editProgramLanguajeDto,
    });
    const updatedProgramLanguaje =
      await this.editProgramLanguajeUseCase.execute(command);
    return updatedProgramLanguaje.toPrimitives();
  }
}
