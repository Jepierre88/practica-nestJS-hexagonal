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
import { CreateSkinUseCase } from '@cs2/skin/application/ports/in/create-skin.port';
import { FindSkinsUseCase } from '@cs2/skin/application/ports/in/find-skins.port';
import { UpdateSkinUseCase } from '@cs2/skin/application/ports/in/update-skin.port';
import { DeleteSkinUseCase } from '@cs2/skin/application/ports/in/delete-skin.port';
import { CreateSkinDto } from './dtos/create-skin.dto';
import { UpdateSkinDto } from './dtos/update-skin.dto';
import { CreateSkinCommand } from '@cs2/skin/application/commands/create-skin.command';
import { UpdateSkinCommand } from '@cs2/skin/application/commands/update-skin.command';
import { SkinResponseDto } from './dtos/skin-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { SkinDtoMapper } from './mappers/skin-dto.mapper';
@ApiTags('CS2 - Skins')
@Controller('cs2/skins')
export class SkinController {
  private readonly dtoMapper = new SkinDtoMapper();

  constructor(
    private readonly createSkinUseCase: CreateSkinUseCase,
    private readonly findSkinsUseCase: FindSkinsUseCase,
    private readonly updateSkinUseCase: UpdateSkinUseCase,
    private readonly deleteSkinUseCase: DeleteSkinUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear skin' })
  @ApiResponse({ status: 201, type: SkinResponseDto })
  async create(@Body() dto: CreateSkinDto): Promise<SkinResponseDto> {
    const entity = await this.createSkinUseCase.execute({ ...dto });
    return this.dtoMapper.toResponse(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los skins' })
  @ApiResponse({ status: 200, type: [SkinResponseDto] })
  async findAll(): Promise<SkinResponseDto[]> {
    const entities = await this.findSkinsUseCase.findAll();
    return this.dtoMapper.toResponseList(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener skin por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: SkinResponseDto })
  async findById(@Param() params: UuidParam): Promise<SkinResponseDto> {
    const entity = await this.findSkinsUseCase.findById(params.id);
    return this.dtoMapper.toResponse(entity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar skin' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: SkinResponseDto })
  async update(
    @Param() params: UuidParam,
    @Body() dto: UpdateSkinDto,
  ): Promise<SkinResponseDto> {
    const entity = await this.updateSkinUseCase.execute({
      id: params.id,
      ...dto,
    });
    return this.dtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar skin' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204 })
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteSkinUseCase.execute(params.id);
  }
}
