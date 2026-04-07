import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSkinUseCase } from '../application/ports/in/create-skin.port';
import { CreateSkinService } from '../application/usecases/create-skin.service';
import { FindSkinsUseCase } from '../application/ports/in/find-skins.port';
import { FindSkinsService } from '../application/usecases/find-skins.service';
import { UpdateSkinUseCase } from '../application/ports/in/update-skin.port';
import { UpdateSkinService } from '../application/usecases/update-skin.service';
import { DeleteSkinUseCase } from '../application/ports/in/delete-skin.port';
import { DeleteSkinService } from '../application/usecases/delete-skin.service';
import { SkinRepositoryPort } from '../application/ports/out/skin-repository.port';
import { TypeOrmSkinRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-skin.repository';
import { SkinOrmEntity } from './adapters/out/persistence/typeorm/entities/skin-orm.entity';
import { SkinController } from './adapters/in/rest/skin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SkinOrmEntity])],
  controllers: [SkinController],
  providers: [
    { provide: CreateSkinUseCase, useClass: CreateSkinService },
    { provide: SkinRepositoryPort, useClass: TypeOrmSkinRepository },
    { provide: FindSkinsUseCase, useClass: FindSkinsService },
    { provide: UpdateSkinUseCase, useClass: UpdateSkinService },
    { provide: DeleteSkinUseCase, useClass: DeleteSkinService },
  ],
  exports: [SkinRepositoryPort],
})
export class SkinModule {}
