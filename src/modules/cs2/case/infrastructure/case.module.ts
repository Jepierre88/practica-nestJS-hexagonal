import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCaseUseCase } from '../application/ports/in/create-case.port';
import { CreateCaseService } from '../application/usecases/create-case.service';
import { FindCasesUseCase } from '../application/ports/in/find-cases.port';
import { FindCasesService } from '../application/usecases/find-cases.service';
import { UpdateCaseUseCase } from '../application/ports/in/update-case.port';
import { UpdateCaseService } from '../application/usecases/update-case.service';
import { DeleteCaseUseCase } from '../application/ports/in/delete-case.port';
import { DeleteCaseService } from '../application/usecases/delete-case.service';
import { ManageCaseSkinsUseCase } from '../application/ports/in/manage-case-skins.port';
import { ManageCaseSkinsService } from '../application/usecases/manage-case-skins.service';
import { OpenCaseUseCase } from '../application/ports/in/open-case.port';
import { OpenCaseService } from '../application/usecases/open-case.service';
import { CaseRepositoryPort } from '../application/ports/out/case-repository.port';
import { TypeOrmCaseRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-case.repository';
import { CaseOrmEntity } from './adapters/out/persistence/typeorm/entities/case-orm.entity';
import { CaseSkinOrmEntity } from './adapters/out/persistence/typeorm/entities/case-skin-orm.entity';
import { CaseController } from './adapters/in/rest/case.controller';
import { SkinModule } from '@cs2/skin/infrastructure/skin.module';
import { OpeningModule } from '@cs2/opening/infrastructure/opening.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaseOrmEntity, CaseSkinOrmEntity]),
    SkinModule,
    forwardRef(() => OpeningModule),
  ],
  controllers: [CaseController],
  providers: [
    { provide: CreateCaseUseCase, useClass: CreateCaseService },
    { provide: CaseRepositoryPort, useClass: TypeOrmCaseRepository },
    { provide: FindCasesUseCase, useClass: FindCasesService },
    { provide: UpdateCaseUseCase, useClass: UpdateCaseService },
    { provide: DeleteCaseUseCase, useClass: DeleteCaseService },
    { provide: ManageCaseSkinsUseCase, useClass: ManageCaseSkinsService },
    { provide: OpenCaseUseCase, useClass: OpenCaseService },
  ],
  exports: [CaseRepositoryPort],
})
export class CaseModule {}
