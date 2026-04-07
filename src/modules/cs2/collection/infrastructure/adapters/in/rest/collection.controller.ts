import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateCollectionUseCase } from '@cs2/collection/application/ports/in/create-collection.port';
import { FindCollectionsUseCase } from '@cs2/collection/application/ports/in/find-collections.port';
import { UpdateCollectionUseCase } from '@cs2/collection/application/ports/in/update-collection.port';
import { DeleteCollectionUseCase } from '@cs2/collection/application/ports/in/delete-collection.port';
import { CreateCollectionDto } from './dtos/create-collection.dto';
import { UpdateCollectionDto } from './dtos/update-collection.dto';
import { CreateCollectionCommand } from '@cs2/collection/application/commands/create-collection.command';
import { UpdateCollectionCommand } from '@cs2/collection/application/commands/update-collection.command';
import { CollectionResponseDto } from './dtos/collection-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { CollectionDtoMapper } from './mappers/collection-dto.mapper';
@ApiTags('CS2 - Collections')
@Controller('cs2/collections')
export class CollectionController {
  private readonly dtoMapper = new CollectionDtoMapper();

  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
    private readonly findCollectionsUseCase: FindCollectionsUseCase,
    private readonly updateCollectionUseCase: UpdateCollectionUseCase,
    private readonly deleteCollectionUseCase: DeleteCollectionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear colección' })
  @ApiResponse({ status: 201, type: CollectionResponseDto })
  async create(@Body() dto: CreateCollectionDto): Promise<CollectionResponseDto> {
    const entity = await this.createCollectionUseCase.execute(CreateCollectionCommand.create({ ...dto }));
    return this.dtoMapper.toResponse(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las colecciones' })
  @ApiResponse({ status: 200, type: [CollectionResponseDto] })
  async findAll(): Promise<CollectionResponseDto[]> {
    const entities = await this.findCollectionsUseCase.findAll();
    return this.dtoMapper.toResponseList(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener colección por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CollectionResponseDto })
  async findById(@Param() params: UuidParam): Promise<CollectionResponseDto> {
    const entity = await this.findCollectionsUseCase.findById(params.id);
    return this.dtoMapper.toResponse(entity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar colección' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CollectionResponseDto })
  async update(@Param() params: UuidParam, @Body() dto: UpdateCollectionDto): Promise<CollectionResponseDto> {
    const entity = await this.updateCollectionUseCase.execute(UpdateCollectionCommand.create({ id: params.id, ...dto }));
    return this.dtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar colección' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204 })
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteCollectionUseCase.execute(params.id);
  }
}
