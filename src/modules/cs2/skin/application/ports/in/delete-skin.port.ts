export abstract class DeleteSkinUseCase {
  abstract execute(id: string): Promise<void>;
}
