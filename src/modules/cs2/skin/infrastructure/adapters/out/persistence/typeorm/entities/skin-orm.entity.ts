import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WeaponOrmEntity } from '@cs2/weapon/infrastructure/adapters/out/persistence/typeorm/entities/weapon-orm.entity';
import { CollectionOrmEntity } from '@cs2/collection/infrastructure/adapters/out/persistence/typeorm/entities/collection-orm.entity';

@Entity('skins', { schema: DbSchemas.Cs2 })
export class SkinOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ name: 'skin_float', type: 'decimal', precision: 10, scale: 8 })
  skinFloat!: number;

  @Column({ name: 'weapon_id', type: 'uuid' })
  weaponId!: string;

  @ManyToOne(() => WeaponOrmEntity, { eager: true })
  @JoinColumn({ name: 'weapon_id' })
  weapon!: WeaponOrmEntity;

  @Column({ name: 'collection_id', type: 'uuid' })
  collectionId!: string;

  @ManyToOne(() => CollectionOrmEntity, { eager: true })
  @JoinColumn({ name: 'collection_id' })
  collection!: CollectionOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}
