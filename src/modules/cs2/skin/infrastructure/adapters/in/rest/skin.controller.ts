import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
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
@Controller('cs2/skins')
export class SkinController {
  constructor(
    private readonly createSkinUseCase: CreateSkinUseCase,
    private readonly findSkinsUseCase: FindSkinsUseCase,
    private readonly updateSkinUseCase: UpdateSkinUseCase,
    private readonly deleteSkinUseCase: DeleteSkinUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateSkinDto): Promise<SkinResponseDto> {
    const entity = await this.createSkinUseCase.execute(CreateSkinCommand.create({ ...dto }));
    return SkinDtoMapper.toResponse(entity);
  }

  @Get()
  async findAll(): Promise<SkinResponseDto[]> {
    const entities = await this.findSkinsUseCase.findAll();
    return SkinDtoMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param() params: UuidParam): Promise<SkinResponseDto> {
    const entity = await this.findSkinsUseCase.findById(params.id);
    return SkinDtoMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param() params: UuidParam, @Body() dto: UpdateSkinDto): Promise<SkinResponseDto> {
    const entity = await this.updateSkinUseCase.execute(UpdateSkinCommand.create({ id: params.id, ...dto }));
    return SkinDtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteSkinUseCase.execute(params.id);
  }
}
