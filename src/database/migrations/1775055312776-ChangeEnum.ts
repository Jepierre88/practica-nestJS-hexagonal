import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEnum1775055312776 implements MigrationInterface {
    name = 'ChangeEnum1775055312776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task"."tasks" ADD "user_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task"."tasks" DROP COLUMN "user_id"`);
    }

}
