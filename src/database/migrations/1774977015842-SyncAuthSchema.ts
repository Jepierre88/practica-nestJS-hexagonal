import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncAuthSchema1774977015842 implements MigrationInterface {
    name = 'SyncAuthSchema1774977015842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "last_name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD "password_hash" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task"."tasks" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task"."tasks" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "lastName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
