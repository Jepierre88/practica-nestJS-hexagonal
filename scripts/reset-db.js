#!/usr/bin/env node

/**
 * Reinicia TODA la base de datos: elimina schemas, tablas de migraciones,
 * y luego recrea los schemas desde cero.
 *
 * ⚠️  PELIGROSO: destruye TODOS los datos.
 * Pide confirmación 3 veces antes de ejecutar.
 *
 * Uso: node scripts/reset-db.js
 */

require('dotenv/config');
require('ts-node').register({ transpileOnly: true });
require('tsconfig-paths').register();
const { Client } = require('pg');
const readline = require('readline');
const { DbSchemas } = require('@shared/schemas');

const SCHEMAS = Object.values(DbSchemas);
const DB_NAME = process.env.DB_NAME || 'practice_nest';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) => new Promise((r) => rl.question(q, r));

async function confirmThreeTimes() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  ⚠️  ADVERTENCIA: RESET TOTAL DE BASE DE DATOS      ║');
  console.log('║  Se eliminarán TODOS los schemas y datos de:        ║');
  console.log(`║  DB: ${DB_NAME.padEnd(48)}║`);
  console.log(
    `║  Schemas: [${SCHEMAS.join(', ')}]${' '.repeat(Math.max(0, 36 - SCHEMAS.join(', ').length))}║`,
  );
  console.log('║  Esta acción NO se puede deshacer.                  ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');

  const prompts = [
    `[1/3] ¿Estás seguro de que quieres ELIMINAR toda la BD "${DB_NAME}"? (escribe "si" para continuar): `,
    '[2/3] ¿REALMENTE quieres borrar TODOS los datos? No hay vuelta atrás. (escribe "si" para continuar): ',
    '[3/3] ÚLTIMA OPORTUNIDAD. ¿Confirmas el reset TOTAL? (escribe "si" para ejecutar): ',
  ];

  for (const prompt of prompts) {
    const answer = await ask(prompt);
    if (answer.trim().toLowerCase() !== 'si') {
      console.log('\n✖ Operación cancelada. No se realizaron cambios.');
      rl.close();
      process.exit(0);
    }
  }
}

async function main() {
  await confirmThreeTimes();
  rl.close();

  console.log('\n⏳ Ejecutando reset...\n');

  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: DB_NAME,
  });

  try {
    await client.connect();

    // 1. Eliminar schemas con CASCADE (borra todas las tablas dentro)
    for (const schema of SCHEMAS) {
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      console.log(`  ✓ Schema "${schema}" eliminado.`);
    }

    // 2. Eliminar tabla de migraciones (está en public)
    await client.query('DROP TABLE IF EXISTS public.migrations CASCADE');
    console.log('  ✓ Tabla "migrations" eliminada.');

    // 3. Recrear schemas vacíos
    console.log('');
    for (const schema of SCHEMAS) {
      await client.query(`CREATE SCHEMA "${schema}"`);
      console.log(`  ✓ Schema "${schema}" recreado.`);
    }

    console.log('\n✔ Base de datos reiniciada correctamente.');
    console.log(
      '  Ejecuta "npm run migration:run" para re-aplicar las migraciones.',
    );
  } catch (err) {
    console.error('✖ Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
