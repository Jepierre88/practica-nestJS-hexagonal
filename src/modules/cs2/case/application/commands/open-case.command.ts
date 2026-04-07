export class OpenCaseCommand {
  private constructor(public readonly caseId: string) {}

  static create(caseId: string): OpenCaseCommand {
    return new OpenCaseCommand(caseId);
  }
}
