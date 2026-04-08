import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateCollectionCommand } from '@cs2/collection/application/commands/create-collection.command';
import { Collection } from '@cs2/collection/domain/models/collection.model';

export abstract class CreateCollectionUseCase implements UseCasePort<
  CreateCollectionCommand,
  Collection
> {
  abstract execute(input: CreateCollectionCommand): Promise<Collection>;
}
