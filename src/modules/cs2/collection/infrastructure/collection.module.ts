import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCollectionUseCase } from '../application/ports/in/create-collection.port';
import { CreateCollectionService } from '../application/usecases/create-collection.service';
import { FindCollectionsUseCase } from '../application/ports/in/find-collections.port';
import { FindCollectionsService } from '../application/usecases/find-collections.service';
import { UpdateCollectionUseCase } from '../application/ports/in/update-collection.port';
import { UpdateCollectionService } from '../application/usecases/update-collection.service';
import { DeleteCollectionUseCase } from '../application/ports/in/delete-collection.port';
import { DeleteCollectionService } from '../application/usecases/delete-collection.service';
import { CollectionRepositoryPort } from '../application/ports/out/collection-repository.port';
import { TypeOrmCollectionRepository } from './adapters/out/persistence/typeorm/repositories/typeorm-collection.repository';
import { CollectionOrmEntity } from './adapters/out/persistence/typeorm/entities/collection-orm.entity';
import { CollectionController } from './adapters/in/rest/collection.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionOrmEntity])],
  controllers: [CollectionController],
  providers: [
    { provide: CreateCollectionUseCase, useClass: CreateCollectionService },
    { provide: CollectionRepositoryPort, useClass: TypeOrmCollectionRepository },
    { provide: FindCollectionsUseCase, useClass: FindCollectionsService },
    { provide: UpdateCollectionUseCase, useClass: UpdateCollectionService },
    { provide: DeleteCollectionUseCase, useClass: DeleteCollectionService },
  ],
  exports: [CollectionRepositoryPort],
})
export class CollectionModule {}
