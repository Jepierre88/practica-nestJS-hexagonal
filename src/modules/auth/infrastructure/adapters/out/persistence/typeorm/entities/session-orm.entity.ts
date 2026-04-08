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
} from 'typeorm';

@Entity('sessions', { schema: DbSchemas.Auth })
@Index(['userId'])
@Index(['refreshTokenHash'], { unique: true }) // evita duplicados
export class SessionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  /**
   * HASH del refresh token (NUNCA guardes el token plano)
   */
  @Column({ name: 'refresh_token_hash', type: 'varchar', length: 255 })
  refreshTokenHash!: string;

  /**
   * Metadata del dispositivo
   */
  @Column({ name: 'user_agent', type: 'varchar', length: 1000, nullable: true })
  userAgent!: string | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 100, nullable: true })
  ipAddress!: string | null;

  @Column({ name: 'device_name', type: 'varchar', length: 255, nullable: true })
  deviceName!: string | null;

  /**
   * Expiración del refresh token
   */
  @Column({ name: 'expires_at', type: 'timestamp with time zone' })
  expiresAt!: Date;

  /**
   * Si la sesión fue revocada
   */
  @Column({
    name: 'revoked_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  revokedAt!: Date | null;

  /**
   * Rotación de tokens (seguridad avanzada)
   * guarda el siguiente token que reemplazó este
   */
  @Column({
    name: 'replaced_by_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  replacedByToken!: string | null;

  /**
   * Relación con user
   */
  @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;
}
