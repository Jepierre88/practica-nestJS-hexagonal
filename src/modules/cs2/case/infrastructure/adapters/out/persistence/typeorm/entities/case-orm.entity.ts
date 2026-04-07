import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CaseSkinOrmEntity } from './case-skin-orm.entity';

@Entity('cases', { schema: DbSchemas.Cs2 })
export class CaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => CaseSkinOrmEntity, (cs) => cs.case, { cascade: true, eager: true })
  caseSkins: CaseSkinOrmEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
