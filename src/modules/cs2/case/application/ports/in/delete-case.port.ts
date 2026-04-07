export abstract class DeleteCaseUseCase {
  abstract execute(id: string): Promise<void>;
}
