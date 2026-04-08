import { Module } from '@nestjs/common';
import { WeaponModule } from './weapon/infrastructure/weapon.module';
import { SkinModule } from './skin/infrastructure/skin.module';
import { CaseModule } from './case/infrastructure/case.module';
import { OpeningModule } from './opening/infrastructure/opening.module';
import { CollectionModule } from './collection/infrastructure/collection.module';

@Module({
  imports: [
    WeaponModule,
    SkinModule,
    CaseModule,
    OpeningModule,
    CollectionModule,
  ],
  exports: [
    WeaponModule,
    SkinModule,
    CaseModule,
    OpeningModule,
    CollectionModule,
  ],
})
export class Cs2Module {}
