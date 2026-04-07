import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateCaseCommand } from '@cs2/case/application/commands/create-case.command';
import { Case } from '@cs2/case/domain/models/case.model';

export abstract class CreateCaseUseCase implements UseCasePort<CreateCaseCommand, Case> {
  abstract execute(input: CreateCaseCommand): Promise<Case>;
}
