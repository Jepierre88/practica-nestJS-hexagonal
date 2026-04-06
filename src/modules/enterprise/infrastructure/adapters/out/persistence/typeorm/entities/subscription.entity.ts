import { ESubscriptionType } from '@enterprise/domain/enums/subscription-type.enum';
import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriptions', {
  schema: DbSchemas.Enterprise,
})
export class SubscriptionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'subscription_type',
    type: 'varchar',
    length: 50,
    enum: ESubscriptionType,
  })
  subscriptionType!: ESubscriptionType;

  @Column({ name: 'start_date', type: 'timestamp with time zone' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'timestamp with time zone' })
  endDate!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}
