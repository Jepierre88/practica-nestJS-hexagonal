export abstract class DeleteUserUseCase {
  abstract execute(id: string): Promise<void>;
}
