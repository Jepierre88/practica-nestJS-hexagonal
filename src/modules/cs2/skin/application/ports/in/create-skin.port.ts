import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { CreateSkinCommand } from '@cs2/skin/application/commands/create-skin.command';
import { Skin } from '@cs2/skin/domain/models/skin.model';

export abstract class CreateSkinUseCase implements UseCasePort<
  CreateSkinCommand,
  Skin
> {
  abstract execute(input: CreateSkinCommand): Promise<Skin>;
}
