import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { UpdateSkinCommand } from '@cs2/skin/application/commands/update-skin.command';
import { Skin } from '@cs2/skin/domain/models/skin.model';

export abstract class UpdateSkinUseCase implements UseCasePort<
  UpdateSkinCommand,
  Skin
> {
  abstract execute(input: UpdateSkinCommand): Promise<Skin>;
}
