import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateOpeningUseCase } from '@cs2/opening/application/ports/in/create-opening.port';
import { FindOpeningsUseCase } from '@cs2/opening/application/ports/in/find-openings.port';
import { UpdateOpeningUseCase } from '@cs2/opening/application/ports/in/update-opening.port';
import { DeleteOpeningUseCase } from '@cs2/opening/application/ports/in/delete-opening.port';
import { CreateOpeningDto } from './dtos/create-opening.dto';
import { UpdateOpeningDto } from './dtos/update-opening.dto';
import { CreateOpeningCommand } from '@cs2/opening/application/commands/create-opening.command';
import { UpdateOpeningCommand } from '@cs2/opening/application/commands/update-opening.command';
import { OpeningResponseDto } from './dtos/opening-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { OpeningDtoMapper } from './mappers/opening-dto.mapper';
@Controller('cs2/openings')
export class OpeningController {
  constructor(
    private readonly createOpeningUseCase: CreateOpeningUseCase,
    private readonly findOpeningsUseCase: FindOpeningsUseCase,
    private readonly updateOpeningUseCase: UpdateOpeningUseCase,
    private readonly deleteOpeningUseCase: DeleteOpeningUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOpeningDto): Promise<OpeningResponseDto> {
    const entity = await this.createOpeningUseCase.execute(CreateOpeningCommand.create({ ...dto }));
    return OpeningDtoMapper.toResponse(entity);
  }

  @Get()
  async findAll(): Promise<OpeningResponseDto[]> {
    const entities = await this.findOpeningsUseCase.findAll();
    return OpeningDtoMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param() params: UuidParam): Promise<OpeningResponseDto> {
    const entity = await this.findOpeningsUseCase.findById(params.id);
    return OpeningDtoMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param() params: UuidParam, @Body() dto: UpdateOpeningDto): Promise<OpeningResponseDto> {
    const entity = await this.updateOpeningUseCase.execute(UpdateOpeningCommand.create({ id: params.id, ...dto }));
    return OpeningDtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteOpeningUseCase.execute(params.id);
  }
}
