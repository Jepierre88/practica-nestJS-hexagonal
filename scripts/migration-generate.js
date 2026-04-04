#!/usr/bin/env node

/**
 * Wrapper para migration:generate que usa un nombre genérico si no se pasa --name.
 * Uso:
 *   npm run migration:generate --name=MiCambio
 *   npm run migration:generate              ← usa "Migration" como nombre
 */

const { execSync } = require('child_process');

const name = process.env.npm_config_name || 'Migration';
const migrationPath = `src/database/migrations/${name}`;

console.log(`\n⏳ Generando migración: ${name}\n`);

try {
  execSync(`npm run typeorm -- migration:generate ${migrationPath}`, {
    stdio: 'inherit',
  });
} catch {
  process.exit(1);
}
