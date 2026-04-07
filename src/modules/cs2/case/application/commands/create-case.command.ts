export interface CaseSkinWithRate {
  readonly skinId: string;
  readonly dropRate: number;
}

export interface CreateCasePriceModeProps {
  readonly mode: 'price';
  readonly name: string;
  readonly price: number;
  readonly skinIds: string[];
}

export interface CreateCaseRatesModeProps {
  readonly mode: 'rates';
  readonly name: string;
  readonly skins: CaseSkinWithRate[];
}

export type CreateCaseCommandProps = CreateCasePriceModeProps | CreateCaseRatesModeProps;

export class CreateCaseCommand {
  private constructor(public readonly props: CreateCaseCommandProps) {}

  static create(props: CreateCaseCommandProps): CreateCaseCommand {
    return new CreateCaseCommand(props);
  }

  get mode(): 'price' | 'rates' {
    return this.props.mode;
  }

  get name(): string {
    return this.props.name;
  }
}
