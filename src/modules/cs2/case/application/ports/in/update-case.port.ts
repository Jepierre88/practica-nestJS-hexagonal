import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { UpdateCaseCommand } from '@cs2/case/application/commands/update-case.command';
import { Case } from '@cs2/case/domain/models/case.model';

export abstract class UpdateCaseUseCase implements UseCasePort<UpdateCaseCommand, Case> {
  abstract execute(input: UpdateCaseCommand): Promise<Case>;
}
