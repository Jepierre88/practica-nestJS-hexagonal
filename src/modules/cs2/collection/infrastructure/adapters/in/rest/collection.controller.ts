import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
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
@Controller('cs2/collections')
export class CollectionController {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
    private readonly findCollectionsUseCase: FindCollectionsUseCase,
    private readonly updateCollectionUseCase: UpdateCollectionUseCase,
    private readonly deleteCollectionUseCase: DeleteCollectionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCollectionDto): Promise<CollectionResponseDto> {
    const entity = await this.createCollectionUseCase.execute(CreateCollectionCommand.create({ ...dto }));
    return CollectionDtoMapper.toResponse(entity);
  }

  @Get()
  async findAll(): Promise<CollectionResponseDto[]> {
    const entities = await this.findCollectionsUseCase.findAll();
    return CollectionDtoMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param() params: UuidParam): Promise<CollectionResponseDto> {
    const entity = await this.findCollectionsUseCase.findById(params.id);
    return CollectionDtoMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param() params: UuidParam, @Body() dto: UpdateCollectionDto): Promise<CollectionResponseDto> {
    const entity = await this.updateCollectionUseCase.execute(UpdateCollectionCommand.create({ id: params.id, ...dto }));
    return CollectionDtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteCollectionUseCase.execute(params.id);
  }
}
