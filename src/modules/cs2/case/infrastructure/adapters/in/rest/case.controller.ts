import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateCaseUseCase } from '@cs2/case/application/ports/in/create-case.port';
import { FindCasesUseCase } from '@cs2/case/application/ports/in/find-cases.port';
import { UpdateCaseUseCase } from '@cs2/case/application/ports/in/update-case.port';
import { DeleteCaseUseCase } from '@cs2/case/application/ports/in/delete-case.port';
import { CreateCaseDto } from './dtos/create-case.dto';
import { UpdateCaseDto } from './dtos/update-case.dto';
import { CreateCaseCommand } from '@cs2/case/application/commands/create-case.command';
import { UpdateCaseCommand } from '@cs2/case/application/commands/update-case.command';
import { CaseResponseDto } from './dtos/case-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { CaseDtoMapper } from './mappers/case-dto.mapper';
@Controller('cs2/cases')
export class CaseController {
  constructor(
    private readonly createCaseUseCase: CreateCaseUseCase,
    private readonly findCasesUseCase: FindCasesUseCase,
    private readonly updateCaseUseCase: UpdateCaseUseCase,
    private readonly deleteCaseUseCase: DeleteCaseUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCaseDto): Promise<CaseResponseDto> {
    const entity = await this.createCaseUseCase.execute(CreateCaseCommand.create({ ...dto }));
    return CaseDtoMapper.toResponse(entity);
  }

  @Get()
  async findAll(): Promise<CaseResponseDto[]> {
    const entities = await this.findCasesUseCase.findAll();
    return CaseDtoMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param() params: UuidParam): Promise<CaseResponseDto> {
    const entity = await this.findCasesUseCase.findById(params.id);
    return CaseDtoMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param() params: UuidParam, @Body() dto: UpdateCaseDto): Promise<CaseResponseDto> {
    const entity = await this.updateCaseUseCase.execute(UpdateCaseCommand.create({ id: params.id, ...dto }));
    return CaseDtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteCaseUseCase.execute(params.id);
  }
}
