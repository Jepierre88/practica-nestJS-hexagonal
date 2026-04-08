import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateCaseWithPriceCommand } from '@cs2/case/application/commands/create-case.command';
import { Case } from '@cs2/case/domain/models/case.model';

export abstract class CreateCaseWithPriceUseCase implements UseCasePort<
  CreateCaseWithPriceCommand,
  Case
> {
  abstract execute(input: CreateCaseWithPriceCommand): Promise<Case>;
}
