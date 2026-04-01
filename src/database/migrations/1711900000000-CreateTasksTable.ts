import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasksTable1711900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Crear el schema si no existe
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS task`);

    // 2. Crear la tabla dentro del schema
    await queryRunner.createTable(
      new Table({
        schema: 'task',
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '500',
            default: "''",
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'NOW()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task.tasks');
    await queryRunner.query(`DROP SCHEMA IF EXISTS task`);
  }
}
