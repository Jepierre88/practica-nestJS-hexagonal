export interface UseCasePort<Input, Output> {
  execute(input: Input): Promise<Output>;
}
