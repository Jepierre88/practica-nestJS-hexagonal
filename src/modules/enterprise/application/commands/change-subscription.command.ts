import { ESubscriptionType } from '@enterprise/domain/enums/subscription-type.enum';

interface ChangeSubscriptionCommandProps {
  readonly userId: string;
  readonly newPlan: ESubscriptionType;
}

export class ChangeSubscriptionCommand {
  private readonly props: ChangeSubscriptionCommandProps;

  private constructor(props: ChangeSubscriptionCommandProps) {
    this.props = props;
  }

  static create(
    props: ChangeSubscriptionCommandProps,
  ): ChangeSubscriptionCommand {
    return new ChangeSubscriptionCommand(props);
  }

  get userId(): string {
    return this.props.userId;
  }

  get newPlan(): ESubscriptionType {
    return this.props.newPlan;
  }
}
