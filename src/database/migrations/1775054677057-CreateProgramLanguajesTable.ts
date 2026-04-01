import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProgramLanguajesTable1775054677057 implements MigrationInterface {
    name = 'CreateProgramLanguajesTable1775054677057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "tech"`);
        await queryRunner.query(`CREATE TABLE "tech"."program_languajes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "difficulty" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_PROGRAM_LANGUAJE_NAME" UNIQUE ("name"), CONSTRAINT "PK_e8e9e77c3afc2afa1a976da8b86" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tech"."program_languajes"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "tech"`);
    }

}
