#!/usr/bin/env node

/**
 * Crea todos los schemas de la BD definidos en DbSchemas.
 * Uso: node scripts/create-schemas.js
 */

require('dotenv/config');
require('ts-node').register({ transpileOnly: true });
require('tsconfig-paths').register();
const { Client } = require('pg');
const { DbSchemas } = require('@shared/schemas');

const SCHEMAS = Object.values(DbSchemas);

async function main() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'practice_nest',
  });

  try {
    await client.connect();
    console.log('✔ Conectado a la base de datos.\n');

    for (const schema of SCHEMAS) {
      await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
      console.log(`  ✓ Schema "${schema}" creado (o ya existía).`);
    }

    console.log('\n✔ Todos los schemas fueron procesados correctamente.');
  } catch (err) {
    console.error('✖ Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
