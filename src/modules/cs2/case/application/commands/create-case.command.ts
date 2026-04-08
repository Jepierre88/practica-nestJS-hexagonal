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

export type CreateCaseCommand =
  | CreateCasePriceModeProps
  | CreateCaseRatesModeProps;
