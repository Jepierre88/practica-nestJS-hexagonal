import { SubscriptionOrmEntity } from '@enterprise/infrastructure/adapters/out/persistence/typeorm/entities/subscription.entity';
import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserStatus {
  ACTIVE = 'active',
  INVITED = 'invited',
  SUSPENDED = 'suspended',
  DISABLED = 'disabled',
}

@Entity('users', { schema: DbSchemas.Auth })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl!: string | null;

  @Column({
    type!: 'enum',
    enum!: UserStatus,
    default!: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    name!: 'email_verified_at',
    type!: 'timestamp with time zone',
    nullable!: true,
  })
  emailVerifiedAt!: Date | null;

  @Column({
    name!: 'last_login_at',
    type!: 'timestamp with time zone',
    nullable!: true,
  })
  lastLoginAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @DeleteDateColumn({
    name!: 'deleted_at',
    type!: 'timestamp with time zone',
    nullable!: true,
  })
  deletedAt!: Date | null;

  @Column({ name: 'subscription_id', type: 'uuid', nullable: true })
  subscriptionId!: string | null;

  @ManyToOne(() => SubscriptionOrmEntity, { nullable: true, eager: false })
  @JoinColumn({ name: 'subscription_id' })
  subscription!: SubscriptionOrmEntity | null;
}
