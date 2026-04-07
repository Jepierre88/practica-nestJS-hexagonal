export abstract class DeleteOpeningUseCase {
  abstract execute(id: string): Promise<void>;
}
