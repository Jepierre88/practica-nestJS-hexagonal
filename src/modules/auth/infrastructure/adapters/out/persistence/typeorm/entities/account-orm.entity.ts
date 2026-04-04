import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthProvider } from './auth-providers.enum';

@Entity('accounts', { schema: DbSchemas.Auth })
@Index(['provider', 'providerAccountId'], { unique: true }) // evita duplicados por provider
@Index(['userId'])
export class AccountOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  /**
   * Provider de autenticación
   */
  @Column({
    type: 'enum',
    enum: AuthProvider,
  })
  provider!: AuthProvider;

  /**
   * ID único del usuario en el provider externo
   * - LinkedIn: profile.id
   * - SSO: sub (OIDC)
   */
  @Column({ name: 'provider_account_id', type: 'varchar', length: 255 })
  providerAccountId!: string;

  /**
   * Email entregado por el provider
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  /**
   * Indica si el provider confirmó el email
   */
  @Column({ name: 'email_verified', type: 'boolean', default: false })
  emailVerified!: boolean;

  /**
   * Avatar del provider
   */
  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl!: string | null;

  /**
   * Datos crudos del provider (claims, profile, etc.)
   * útil para debugging o features futuras
   */
  @Column({ name: 'provider_data', type: 'jsonb', nullable: true })
  providerData!: Record<string, unknown> | null;

  /**
   * Cuándo se vinculó la cuenta
   */
  @Column({
    name: 'linked_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  linkedAt!: Date;

  /**
   * Último login con este provider
   */
  @Column({
    name: 'last_login_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  lastLoginAt!: Date | null;

  /**
   * Relación con user
   */
  @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}
