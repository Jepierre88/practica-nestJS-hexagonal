import { MigrationInterface, QueryRunner } from "typeorm";

export class NombreDelCambio1774973803293 implements MigrationInterface {
    name = 'NombreDelCambio1774973803293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Crear el schema
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth`);

        // 2. Crear tablas dentro del schema
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_auth_users_email" UNIQUE ("email"), CONSTRAINT "PK_auth_users" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."credentials" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "password_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_auth_credentials" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth"."credentials" ADD CONSTRAINT "FK_auth_credentials_user" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."credentials" DROP CONSTRAINT "FK_auth_credentials_user"`);
        await queryRunner.query(`DROP TABLE "auth"."credentials"`);
        await queryRunner.query(`DROP TABLE "auth"."users"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS auth CASCADE`);
    }

}
