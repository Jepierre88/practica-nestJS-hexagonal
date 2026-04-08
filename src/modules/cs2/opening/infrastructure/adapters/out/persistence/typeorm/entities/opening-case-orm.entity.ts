import { DbSchemas } from '@shared/schemas';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OpeningOrmEntity } from './opening-orm.entity';
import { CaseOrmEntity } from '@cs2/case/infrastructure/adapters/out/persistence/typeorm/entities/case-orm.entity';
import { SkinOrmEntity } from '@cs2/skin/infrastructure/adapters/out/persistence/typeorm/entities/skin-orm.entity';

@Entity('opening_cases', { schema: DbSchemas.Cs2 })
export class OpeningCaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'opening_id', type: 'uuid' })
  openingId: string;

  @Column({ name: 'case_id', type: 'uuid' })
  caseId: string;

  @Column({ name: 'result_skin_id', type: 'uuid' })
  resultSkinId: string;

  @ManyToOne(() => OpeningOrmEntity, (o) => o.openingCases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'opening_id' })
  opening: OpeningOrmEntity;

  @ManyToOne(() => CaseOrmEntity, { eager: true })
  @JoinColumn({ name: 'case_id' })
  case: CaseOrmEntity;

  @ManyToOne(() => SkinOrmEntity, { eager: true })
  @JoinColumn({ name: 'result_skin_id' })
  resultSkin: SkinOrmEntity;
}
