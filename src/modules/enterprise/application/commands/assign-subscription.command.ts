interface AssignSubscriptionCommandProps {
  userId: string;
  subscriptionId: string;
}

export class AssignSubscriptionCommand {
  private props: AssignSubscriptionCommandProps;
  private constructor(props: AssignSubscriptionCommandProps) {
    this.props = props;
  }

  static create(props: AssignSubscriptionCommandProps) {
    return new AssignSubscriptionCommand(props);
  }

  get userId(): string {
    return this.props.userId;
  }

  get subscriptionId(): string {
    return this.props.subscriptionId;
  }
}
