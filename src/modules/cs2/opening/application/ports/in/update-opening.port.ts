import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { UpdateOpeningCommand } from '@cs2/opening/application/commands/update-opening.command';
import { Opening } from '@cs2/opening/domain/models/opening.model';

export abstract class UpdateOpeningUseCase implements UseCasePort<
  UpdateOpeningCommand,
  Opening
> {
  abstract execute(input: UpdateOpeningCommand): Promise<Opening>;
}
