import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Seeder } from './seeder.interface';
import {
  UserOrmEntity,
  UserStatus,
} from '@users/infrastructure/adapters/out/persistence/typeorm/entities/user-orm.entity';
import { CredentialOrmEntity } from '@auth/infrastructure/adapters/out/persistence/typeorm/entities/credential-orm.entity';

interface UserEntry {
  name: string;
  lastName: string;
  email: string;
  password: string;
  status?: UserStatus;
}

const users: UserEntry[] = [
  {
    name: 'Jean Pierre',
    lastName: 'Admin',
    email: 'jeanpi.22241@gmail.com',
    password: 'mamateamo123',
  },
  {
    name: 'Carlos',
    lastName: 'García',
    email: 'carlos.garcia@example.com',
    password: 'Password123!',
  },
  {
    name: 'María',
    lastName: 'López',
    email: 'maria.lopez@example.com',
    password: 'Password123!',
  },
  {
    name: 'Andrés',
    lastName: 'Martínez',
    email: 'andres.martinez@example.com',
    password: 'Password123!',
  },
  {
    name: 'Lucía',
    lastName: 'Rodríguez',
    email: 'lucia.rodriguez@example.com',
    password: 'Password123!',
  },
];

const SALT_ROUNDS = 10;

export class UserSeeder implements Seeder {
  readonly name = 'UserSeeder';

  async run(dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(UserOrmEntity);
    const credRepo = dataSource.getRepository(CredentialOrmEntity);

    let created = 0;
    let skipped = 0;

    for (const entry of users) {
      const exists = await userRepo.findOne({ where: { email: entry.email } });
      if (exists) {
        skipped++;
        continue;
      }

      const userId = uuidv4();

      const user = userRepo.create({
        id: userId,
        name: entry.name,
        lastName: entry.lastName,
        email: entry.email,
        status: entry.status ?? UserStatus.ACTIVE,
      });
      await userRepo.save(user);

      const passwordHash = await bcrypt.hash(entry.password, SALT_ROUNDS);
      const credential = credRepo.create({
        userId,
        passwordHash,
      });
      await credRepo.save(credential);

      created++;
    }

    console.log(`    ✓ ${created} usuarios creados, ${skipped} ya existían.`);
  }
}
