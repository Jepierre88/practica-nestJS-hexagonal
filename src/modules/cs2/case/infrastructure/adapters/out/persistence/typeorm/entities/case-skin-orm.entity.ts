import { DbSchemas } from '@shared/schemas';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CaseOrmEntity } from './case-orm.entity';
import { SkinOrmEntity } from '@cs2/skin/infrastructure/adapters/out/persistence/typeorm/entities/skin-orm.entity';

@Entity('case_skins', { schema: DbSchemas.Cs2 })
export class CaseSkinOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'case_id', type: 'uuid' })
  caseId: string;

  @Column({ name: 'skin_id', type: 'uuid' })
  skinId: string;

  @Column({ name: 'drop_rate', type: 'decimal', precision: 5, scale: 2 })
  dropRate: number;

  @ManyToOne(() => CaseOrmEntity, (c) => c.caseSkins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'case_id' })
  case: CaseOrmEntity;

  @ManyToOne(() => SkinOrmEntity, { eager: true })
  @JoinColumn({ name: 'skin_id' })
  skin: SkinOrmEntity;
}
