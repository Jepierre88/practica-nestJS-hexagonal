export abstract class DeleteCollectionUseCase {
  abstract execute(id: string): Promise<void>;
}
