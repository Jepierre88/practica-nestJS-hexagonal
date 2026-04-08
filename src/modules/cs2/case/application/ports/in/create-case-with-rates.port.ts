import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateCaseWithRatesCommand } from '@cs2/case/application/commands/create-case.command';
import { Case } from '@cs2/case/domain/models/case.model';

export abstract class CreateCaseWithRatesUseCase implements UseCasePort<
  CreateCaseWithRatesCommand,
  Case
> {
  abstract execute(input: CreateCaseWithRatesCommand): Promise<Case>;
}
