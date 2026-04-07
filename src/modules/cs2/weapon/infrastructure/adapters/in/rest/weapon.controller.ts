import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateWeaponUseCase } from '@cs2/weapon/application/ports/in/create-weapon.port';
import { FindWeaponsUseCase } from '@cs2/weapon/application/ports/in/find-weapons.port';
import { UpdateWeaponUseCase } from '@cs2/weapon/application/ports/in/update-weapon.port';
import { DeleteWeaponUseCase } from '@cs2/weapon/application/ports/in/delete-weapon.port';
import { CreateWeaponDto } from './dtos/create-weapon.dto';
import { UpdateWeaponDto } from './dtos/update-weapon.dto';
import { CreateWeaponCommand } from '@cs2/weapon/application/commands/create-weapon.command';
import { UpdateWeaponCommand } from '@cs2/weapon/application/commands/update-weapon.command';
import { WeaponResponseDto } from './dtos/weapon-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { WeaponDtoMapper } from './mappers/weapon-dto.mapper';
@Controller('cs2/weapons')
export class WeaponController {
  constructor(
    private readonly createWeaponUseCase: CreateWeaponUseCase,
    private readonly findWeaponsUseCase: FindWeaponsUseCase,
    private readonly updateWeaponUseCase: UpdateWeaponUseCase,
    private readonly deleteWeaponUseCase: DeleteWeaponUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateWeaponDto): Promise<WeaponResponseDto> {
    const entity = await this.createWeaponUseCase.execute(CreateWeaponCommand.create({ ...dto }));
    return WeaponDtoMapper.toResponse(entity);
  }

  @Get()
  async findAll(): Promise<WeaponResponseDto[]> {
    const entities = await this.findWeaponsUseCase.findAll();
    return WeaponDtoMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param() params: UuidParam): Promise<WeaponResponseDto> {
    const entity = await this.findWeaponsUseCase.findById(params.id);
    return WeaponDtoMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param() params: UuidParam, @Body() dto: UpdateWeaponDto): Promise<WeaponResponseDto> {
    const entity = await this.updateWeaponUseCase.execute(UpdateWeaponCommand.create({ id: params.id, ...dto }));
    return WeaponDtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteWeaponUseCase.execute(params.id);
  }
}
