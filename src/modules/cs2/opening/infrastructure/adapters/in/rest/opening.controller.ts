import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateOpeningUseCase } from '@cs2/opening/application/ports/in/create-opening.port';
import { FindOpeningsUseCase } from '@cs2/opening/application/ports/in/find-openings.port';
import { UpdateOpeningUseCase } from '@cs2/opening/application/ports/in/update-opening.port';
import { DeleteOpeningUseCase } from '@cs2/opening/application/ports/in/delete-opening.port';
import { ManageOpeningCasesUseCase } from '@cs2/opening/application/ports/in/manage-opening-cases.port';
import { CreateOpeningDto } from './dtos/create-opening.dto';
import { UpdateOpeningDto } from './dtos/update-opening.dto';
import { AddCaseToOpeningDto } from './dtos/add-case-to-opening.dto';
import { OpeningResponseDto } from './dtos/opening-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { OpeningDtoMapper } from './mappers/opening-dto.mapper';

@ApiTags('CS2 - Openings')
@Controller('cs2/openings')
export class OpeningController {
  private readonly dtoMapper = new OpeningDtoMapper();

  constructor(
    private readonly createOpeningUseCase: CreateOpeningUseCase,
    private readonly findOpeningsUseCase: FindOpeningsUseCase,
    private readonly updateOpeningUseCase: UpdateOpeningUseCase,
    private readonly deleteOpeningUseCase: DeleteOpeningUseCase,
    private readonly manageOpeningCasesUseCase: ManageOpeningCasesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear apertura' })
  @ApiResponse({ status: 201, type: OpeningResponseDto })
  async create(@Body() dto: CreateOpeningDto): Promise<OpeningResponseDto> {
    const entity = await this.createOpeningUseCase.execute({ ...dto });
    return this.dtoMapper.toResponse(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las aperturas' })
  @ApiResponse({ status: 200, type: [OpeningResponseDto] })
  async findAll(): Promise<OpeningResponseDto[]> {
    const entities = await this.findOpeningsUseCase.findAll();
    return this.dtoMapper.toResponseList(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener apertura por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: OpeningResponseDto })
  async findById(@Param() params: UuidParam): Promise<OpeningResponseDto> {
    const entity = await this.findOpeningsUseCase.findById(params.id);
    return this.dtoMapper.toResponse(entity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar apertura' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: OpeningResponseDto })
  async update(
    @Param() params: UuidParam,
    @Body() dto: UpdateOpeningDto,
  ): Promise<OpeningResponseDto> {
    const entity = await this.updateOpeningUseCase.execute({
      id: params.id,
      ...dto,
    });
    return this.dtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar apertura' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204 })
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteOpeningUseCase.execute(params.id);
  }

  @Post(':id/cases')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Agregar caja a apertura' })
  @ApiParam({ name: 'id', type: String, description: 'ID de la apertura' })
  @ApiResponse({ status: 201, type: OpeningResponseDto })
  async addCase(
    @Param() params: UuidParam,
    @Body() dto: AddCaseToOpeningDto,
  ): Promise<OpeningResponseDto> {
    const entity = await this.manageOpeningCasesUseCase.addCase({
      openingId: params.id,
      ...dto,
    });
    return this.dtoMapper.toResponse(entity);
  }

  @Delete(':id/cases/:caseId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover caja de apertura' })
  @ApiParam({ name: 'id', type: String, description: 'ID de la apertura' })
  @ApiParam({ name: 'caseId', type: String, description: 'ID de la caja' })
  @ApiResponse({ status: 200, type: OpeningResponseDto })
  async removeCase(
    @Param('id') openingId: string,
    @Param('caseId') caseId: string,
  ): Promise<OpeningResponseDto> {
    const entity = await this.manageOpeningCasesUseCase.removeCase({
      openingId,
      caseId,
    });
    return this.dtoMapper.toResponse(entity);
  }
}
