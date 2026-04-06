import 'dotenv/config';
import { DataSource } from 'typeorm';
import { TaskOrmEntity } from '@task/infrastructure/adapters/out/persistence/typeorm/entities/task-orm.entity';
import { UserOrmEntity } from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';
import { ProgramLanguajeEntity } from '@program-languajes/infrastructure/adapters/out/persistence/typeorm/entities/program-languaje.entity';
import { SubscriptionOrmEntity } from '@enterprise/infrastructure/adapters/out/persistence/typeorm/entities/subscription.entity';

/**
 * DataSource usado por TypeORM CLI para migraciones.
 * Se ejecuta con ts-node, no con el runtime de NestJS.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'] ?? 'localhost',
  port: parseInt(process.env['DB_PORT'] ?? '5432', 10),
  username: process.env['DB_USERNAME'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? 'postgres',
  database: process.env['DB_NAME'] ?? 'practice_nest',
  entities: [
    TaskOrmEntity,
    UserOrmEntity,
    CredentialOrmEntity,
    ProgramLanguajeEntity,
    SubscriptionOrmEntity,
  ],
  migrations: ['dist/database/migrations/*'],
  migrationsTableName: 'migrations',
});
