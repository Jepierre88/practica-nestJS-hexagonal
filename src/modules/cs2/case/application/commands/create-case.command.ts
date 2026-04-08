export interface CaseSkinWithRate {
  readonly skinId: string;
  readonly dropRate: number;
}

export interface CreateCaseWithPriceCommand {
  readonly name: string;
  readonly price: number;
  readonly skinIds: string[];
}

export interface CreateCaseWithRatesCommand {
  readonly name: string;
  readonly skins: CaseSkinWithRate[];
}
