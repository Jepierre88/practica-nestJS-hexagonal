import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775328183184 implements MigrationInterface {
    name = 'Migration1775328183184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task"."tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "description" character varying(500) NOT NULL DEFAULT '', "status" character varying(20) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "auth"."users_status_enum" AS ENUM('active', 'invited', 'suspended', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "avatar_url" character varying(500), "status" "auth"."users_status_enum" NOT NULL DEFAULT 'active', "email_verified_at" TIMESTAMP WITH TIME ZONE, "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "password_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_c68a6c53e95a7dc357f4ebce8f0" UNIQUE ("user_id"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "tech"."program_languajes_difficulty_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "tech"."program_languajes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "difficulty" "tech"."program_languajes_difficulty_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_PROGRAM_LANGUAJE_NAME" UNIQUE ("name"), CONSTRAINT "PK_e8e9e77c3aec2afa1a976da8b86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`DROP TABLE "tech"."program_languajes"`);
        await queryRunner.query(`DROP TYPE "tech"."program_languajes_difficulty_enum"`);
        await queryRunner.query(`DROP TABLE "auth"."credentials"`);
        await queryRunner.query(`DROP TABLE "auth"."users"`);
        await queryRunner.query(`DROP TYPE "auth"."users_status_enum"`);
        await queryRunner.query(`DROP TABLE "task"."tasks"`);
    }

}
