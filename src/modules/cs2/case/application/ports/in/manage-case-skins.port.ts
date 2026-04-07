import { Case } from '@cs2/case/domain/models/case.model';
import { AddSkinToCaseCommand } from '../../commands/add-skin-to-case.command';
import { RemoveSkinFromCaseCommand } from '../../commands/remove-skin-from-case.command';

export abstract class ManageCaseSkinsUseCase {
  abstract addSkin(command: AddSkinToCaseCommand): Promise<Case>;
  abstract removeSkin(command: RemoveSkinFromCaseCommand): Promise<Case>;
}
