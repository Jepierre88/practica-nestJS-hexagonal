import { Opening } from '@cs2/opening/domain/models/opening.model';
import { AddCaseToOpeningCommand } from '../../commands/add-case-to-opening.command';
import { RemoveCaseFromOpeningCommand } from '../../commands/remove-case-from-opening.command';

export abstract class ManageOpeningCasesUseCase {
  abstract addCase(command: AddCaseToOpeningCommand): Promise<Opening>;
  abstract removeCase(command: RemoveCaseFromOpeningCommand): Promise<Opening>;
}
