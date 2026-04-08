import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateOpeningCommand } from '@cs2/opening/application/commands/create-opening.command';
import { Opening } from '@cs2/opening/domain/models/opening.model';

export abstract class CreateOpeningUseCase implements UseCasePort<
  CreateOpeningCommand,
  Opening
> {
  abstract execute(input: CreateOpeningCommand): Promise<Opening>;
}
