import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { UpdateCollectionCommand } from '@cs2/collection/application/commands/update-collection.command';
import { Collection } from '@cs2/collection/domain/models/collection.model';

export abstract class UpdateCollectionUseCase implements UseCasePort<
  UpdateCollectionCommand,
  Collection
> {
  abstract execute(input: UpdateCollectionCommand): Promise<Collection>;
}
