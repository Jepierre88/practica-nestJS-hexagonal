import dataSource from '@database/typeorm.config';
import { Seeder } from './seeder.interface';
import { TaskSeeder } from './task.seed';
import { ProgramLanguajeSeeder } from './program-languaje.seed';
import { UserSeeder } from './user.seed';

/**
 * Registra aquí todos los seeders en el orden que deben ejecutarse.
 */
const seeders: Seeder[] = [
  new UserSeeder(),
  new TaskSeeder(),
  new ProgramLanguajeSeeder(),
];

async function runSeeds(): Promise<void> {
  console.log('🌱 Iniciando seeds...\n');

  await dataSource.initialize();

  for (const seeder of seeders) {
    console.log(`▶ Ejecutando ${seeder.name}...`);
    await seeder.run(dataSource);
  }

  await dataSource.destroy();
  console.log('\n🌱 Seeds completados.');
}

runSeeds().catch((error: unknown) => {
  console.error('❌ Error ejecutando seeds:', error);
  process.exit(1);
});
