import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateWeaponUseCase } from '../application/ports/in/create-weapon.port';
import { CreateWeaponService } from '../application/usecases/create-weapon.service';
import { FindWeaponsUseCase } from '../application/ports/in/find-weapons.port';
import { FindWeaponsService } from '../application/usecases/find-weapons.service';
import { UpdateWeaponUseCase } from '../application/ports/in/update-weapon.port';
import { UpdateWeaponService } from '../application/usecases/update-weapon.service';
import { DeleteWeaponUseCase } from '../application/ports/in/delete-weapon.port';
import { DeleteWeaponService } from '../application/usecases/delete-weapon.service';
import { WeaponRepositoryPort } from '../application/ports/out/weapon-repository.port';
import { TypeOrmWeaponRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-weapon.repository';
import { WeaponOrmEntity } from './adapters/out/persistence/typeorm/entities/weapon-orm.entity';
import { WeaponController } from './adapters/in/rest/weapon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponOrmEntity])],
  controllers: [WeaponController],
  providers: [
    { provide: CreateWeaponUseCase, useClass: CreateWeaponService },
    { provide: WeaponRepositoryPort, useClass: TypeOrmWeaponRepository },
    { provide: FindWeaponsUseCase, useClass: FindWeaponsService },
    { provide: UpdateWeaponUseCase, useClass: UpdateWeaponService },
    { provide: DeleteWeaponUseCase, useClass: DeleteWeaponService },
  ],
  exports: [WeaponRepositoryPort],
})
export class WeaponModule {}
