import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEnum1775055023529 implements MigrationInterface {
    name = 'ChangeEnum1775055023529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tech"."program_languajes" DROP COLUMN "difficulty"`);
        await queryRunner.query(`CREATE TYPE "tech"."program_languajes_difficulty_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "tech"."program_languajes" ADD "difficulty" "tech"."program_languajes_difficulty_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tech"."program_languajes" DROP COLUMN "difficulty"`);
        await queryRunner.query(`DROP TYPE "tech"."program_languajes_difficulty_enum"`);
        await queryRunner.query(`ALTER TABLE "tech"."program_languajes" ADD "difficulty" integer`);
    }

}
