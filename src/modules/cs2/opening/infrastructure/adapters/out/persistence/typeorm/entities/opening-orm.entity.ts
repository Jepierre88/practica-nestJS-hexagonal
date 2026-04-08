import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OpeningCaseOrmEntity } from './opening-case-orm.entity';

@Entity('openings', { schema: DbSchemas.Cs2 })
export class OpeningOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @OneToMany(() => OpeningCaseOrmEntity, (oc) => oc.opening, {
    cascade: true,
    eager: true,
  })
  openingCases!: OpeningCaseOrmEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}
