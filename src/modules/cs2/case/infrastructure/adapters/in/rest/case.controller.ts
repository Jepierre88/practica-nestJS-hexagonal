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
import { CreateCaseUseCase } from '@cs2/case/application/ports/in/create-case.port';
import { FindCasesUseCase } from '@cs2/case/application/ports/in/find-cases.port';
import { UpdateCaseUseCase } from '@cs2/case/application/ports/in/update-case.port';
import { DeleteCaseUseCase } from '@cs2/case/application/ports/in/delete-case.port';
import { ManageCaseSkinsUseCase } from '@cs2/case/application/ports/in/manage-case-skins.port';
import { OpenCaseUseCase } from '@cs2/case/application/ports/in/open-case.port';
import { CreateCaseDto } from './dtos/create-case.dto';
import { UpdateCaseDto } from './dtos/update-case.dto';
import { AddSkinToCaseDto } from './dtos/add-skin-to-case.dto';
import { CreateCaseCommand } from '@cs2/case/application/commands/create-case.command';
import { UpdateCaseCommand } from '@cs2/case/application/commands/update-case.command';
import { AddSkinToCaseCommand } from '@cs2/case/application/commands/add-skin-to-case.command';
import { RemoveSkinFromCaseCommand } from '@cs2/case/application/commands/remove-skin-from-case.command';
import { CaseResponseDto } from './dtos/case-response.dto';
import {
  CaseOpenResultDto,
  CaseOpenSkinDto,
} from './dtos/case-open-result.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { CaseDtoMapper } from './mappers/case-dto.mapper';

@ApiTags('CS2 - Cases')
@Controller('cs2/cases')
export class CaseController {
  private readonly dtoMapper = new CaseDtoMapper();

  constructor(
    private readonly createCaseUseCase: CreateCaseUseCase,
    private readonly findCasesUseCase: FindCasesUseCase,
    private readonly updateCaseUseCase: UpdateCaseUseCase,
    private readonly deleteCaseUseCase: DeleteCaseUseCase,
    private readonly manageCaseSkinsUseCase: ManageCaseSkinsUseCase,
    private readonly openCaseUseCase: OpenCaseUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear caja',
    description:
      'Modo "price": envía price + skinIds (drop rates auto). Modo "rates": envía skins con dropRate (precio auto).',
  })
  @ApiResponse({ status: 201, type: CaseResponseDto })
  async create(@Body() dto: CreateCaseDto): Promise<CaseResponseDto> {
    let command: CreateCaseCommand;

    if (dto.skins && dto.skins.length > 0) {
      command = {
        mode: 'rates',
        name: dto.name,
        skins: dto.skins,
      };
    } else {
      command = {
        mode: 'price',
        name: dto.name,
        price: dto.price ?? 0,
        skinIds: dto.skinIds ?? [],
      };
    }

    const entity = await this.createCaseUseCase.execute(command);
    return this.dtoMapper.toResponse(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las cajas' })
  @ApiResponse({ status: 200, type: [CaseResponseDto] })
  async findAll(): Promise<CaseResponseDto[]> {
    const entities = await this.findCasesUseCase.findAll();
    return this.dtoMapper.toResponseList(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener caja por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CaseResponseDto })
  async findById(@Param() params: UuidParam): Promise<CaseResponseDto> {
    const entity = await this.findCasesUseCase.findById(params.id);
    return this.dtoMapper.toResponse(entity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar caja' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CaseResponseDto })
  async update(
    @Param() params: UuidParam,
    @Body() dto: UpdateCaseDto,
  ): Promise<CaseResponseDto> {
    const entity = await this.updateCaseUseCase.execute({
      id: params.id,
      ...dto,
    });
    return this.dtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar caja' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204 })
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteCaseUseCase.execute(params.id);
  }

  @Post(':id/skins')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Agregar skin a caja',
    description: 'Los drop rates se recalculan automáticamente.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID de la caja' })
  @ApiResponse({ status: 201, type: CaseResponseDto })
  async addSkin(
    @Param() params: UuidParam,
    @Body() dto: AddSkinToCaseDto,
  ): Promise<CaseResponseDto> {
    const entity = await this.manageCaseSkinsUseCase.addSkin({
      caseId: params.id,
      skinId: dto.skinId,
    });
    return this.dtoMapper.toResponse(entity);
  }

  @Delete(':id/skins/:skinId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover skin de caja' })
  @ApiParam({ name: 'id', type: String, description: 'ID de la caja' })
  @ApiParam({ name: 'skinId', type: String, description: 'ID del skin' })
  @ApiResponse({ status: 200, type: CaseResponseDto })
  async removeSkin(
    @Param('id') caseId: string,
    @Param('skinId') skinId: string,
  ): Promise<CaseResponseDto> {
    const entity = await this.manageCaseSkinsUseCase.removeSkin({
      caseId,
      skinId,
    });
    return this.dtoMapper.toResponse(entity);
  }

  @Post(':id/open')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Abrir caja',
    description:
      'Selecciona un skin aleatorio basado en drop rates. Devuelve el resultado y todos los skins para la animación del spinner.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID de la caja' })
  @ApiResponse({ status: 200, type: CaseOpenResultDto })
  async open(@Param() params: UuidParam): Promise<CaseOpenResultDto> {
    const result = await this.openCaseUseCase.execute(params.id);

    const mapSkin = (cs: {
      skin: {
        id?: string;
        name: string;
        price: number;
        skinFloat: number;
        weapon: { name: string };
        collection: { name: string };
      };
      dropRate: number;
    }): CaseOpenSkinDto => ({
      skinId: cs.skin.id!,
      skinName: cs.skin.name,
      skinPrice: cs.skin.price,
      skinFloat: cs.skin.skinFloat,
      weaponName: cs.skin.weapon.name,
      collectionName: cs.skin.collection.name,
      dropRate: cs.dropRate,
    });

    return {
      openingId: result.openingId,
      caseId: result.case_.id!,
      caseName: result.case_.name,
      casePrice: result.case_.price,
      winnerIndex: result.winnerIndex,
      winner: mapSkin(result.winnerSkin),
      skins: result.case_.caseSkins.map((cs) => mapSkin(cs)),
    };
  }
}
