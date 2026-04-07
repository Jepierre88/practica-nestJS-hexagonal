import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOpeningUseCase } from '../application/ports/in/create-opening.port';
import { CreateOpeningService } from '../application/usecases/create-opening.service';
import { FindOpeningsUseCase } from '../application/ports/in/find-openings.port';
import { FindOpeningsService } from '../application/usecases/find-openings.service';
import { UpdateOpeningUseCase } from '../application/ports/in/update-opening.port';
import { UpdateOpeningService } from '../application/usecases/update-opening.service';
import { DeleteOpeningUseCase } from '../application/ports/in/delete-opening.port';
import { DeleteOpeningService } from '../application/usecases/delete-opening.service';
import { ManageOpeningCasesUseCase } from '../application/ports/in/manage-opening-cases.port';
import { ManageOpeningCasesService } from '../application/usecases/manage-opening-cases.service';
import { OpeningRepositoryPort } from '../application/ports/out/opening-repository.port';
import { TypeOrmOpeningRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-opening.repository';
import { OpeningOrmEntity } from './adapters/out/persistence/typeorm/entities/opening-orm.entity';
import { OpeningCaseOrmEntity } from './adapters/out/persistence/typeorm/entities/opening-case-orm.entity';
import { OpeningController } from './adapters/in/rest/opening.controller';
import { CaseModule } from '@cs2/case/infrastructure/case.module';
import { SkinModule } from '@cs2/skin/infrastructure/skin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpeningOrmEntity, OpeningCaseOrmEntity]),
    forwardRef(() => CaseModule),
    SkinModule,
  ],
  controllers: [OpeningController],
  providers: [
    { provide: CreateOpeningUseCase, useClass: CreateOpeningService },
    { provide: OpeningRepositoryPort, useClass: TypeOrmOpeningRepository },
    { provide: FindOpeningsUseCase, useClass: FindOpeningsService },
    { provide: UpdateOpeningUseCase, useClass: UpdateOpeningService },
    { provide: DeleteOpeningUseCase, useClass: DeleteOpeningService },
    { provide: ManageOpeningCasesUseCase, useClass: ManageOpeningCasesService },
  ],
  exports: [OpeningRepositoryPort],
})
export class OpeningModule {}
