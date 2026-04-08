import { ESubscriptionType } from '@enterprise/domain/enums/subscription-type.enum';

export interface ChangeSubscriptionCommand {
  readonly userId: string;
  readonly newPlan: ESubscriptionType;
}
