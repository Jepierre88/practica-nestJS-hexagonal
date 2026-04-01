export abstract class DeleteTaskUseCase {
  abstract execute(id: string): Promise<void>;
}
