import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';
import { ESubscriptionType } from '../enums/subscription-type.enum';

interface SubscriptionProps {
  readonly id?: string;
  readonly subscriptionType: ESubscriptionType;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

type CreateSubscriptionProps = Omit<
  SubscriptionProps,
  'id' | 'createdAt' | 'updatedAt'
>;

type ReconstructSubscriptionProps = SubscriptionProps;

export interface Subscription extends DomainProps<SubscriptionProps> {}
export class Subscription extends DomainModel<SubscriptionProps> {
  private constructor(props: SubscriptionProps) {
    super(props);
  }

  static create(props: CreateSubscriptionProps): Subscription {
    return new Subscription(props);
  }

  static reconstruct(props: ReconstructSubscriptionProps): Subscription {
    return new Subscription(props);
  }

  toPrimitives() {
    return {
      ...this.props,
    };
  }
}
