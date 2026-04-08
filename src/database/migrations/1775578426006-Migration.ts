import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1775578426006 implements MigrationInterface {
  name = 'Migration1775578426006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enterprise"."subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subscription_type" character varying(50) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "auth"."users_status_enum" AS ENUM('active', 'invited', 'suspended', 'disabled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "avatar_url" character varying(500), "status" "auth"."users_status_enum" NOT NULL DEFAULT 'active', "email_verified_at" TIMESTAMP WITH TIME ZONE, "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "subscription_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task"."tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "description" character varying(500) NOT NULL DEFAULT '', "status" character varying(20) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "password_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_c68a6c53e95a7dc357f4ebce8f0" UNIQUE ("user_id"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "tech"."program_languajes_difficulty_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tech"."program_languajes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "difficulty" "tech"."program_languajes_difficulty_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_PROGRAM_LANGUAJE_NAME" UNIQUE ("name"), CONSTRAINT "PK_e8e9e77c3aec2afa1a976da8b86" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cs2"."weapons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a102f55ffbab023a922ac10ab76" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cs2"."collections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cs2"."openings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_52465524569a0b0e856a64eb48b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cs2"."skins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "price" numeric(10,2) NOT NULL, "skin_float" numeric(10,8) NOT NULL, "weapon_id" uuid NOT NULL, "collection_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c47cf9e147be994b18e622848c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cs2"."case_skins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "case_id" uuid NOT NULL, "skin_id" uuid NOT NULL, "drop_rate" numeric(5,2) NOT NULL, CONSTRAINT "PK_4260620e05e570d35dd288d8a3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cs2"."cases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_264acb3048c240fb89aa34626db" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339" FOREIGN KEY ("subscription_id") REFERENCES "enterprise"."subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."skins" ADD CONSTRAINT "FK_35b23d32ed7212aa41c646b8ede" FOREIGN KEY ("weapon_id") REFERENCES "cs2"."weapons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."skins" ADD CONSTRAINT "FK_9125ec6d5c991705e61175dc21b" FOREIGN KEY ("collection_id") REFERENCES "cs2"."collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."case_skins" ADD CONSTRAINT "FK_dc22ac77e1778a26a0a6aa775db" FOREIGN KEY ("case_id") REFERENCES "cs2"."cases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."case_skins" ADD CONSTRAINT "FK_5bc16cf3a13e77a44e73a0f7e9f" FOREIGN KEY ("skin_id") REFERENCES "cs2"."skins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cs2"."case_skins" DROP CONSTRAINT "FK_5bc16cf3a13e77a44e73a0f7e9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."case_skins" DROP CONSTRAINT "FK_dc22ac77e1778a26a0a6aa775db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."skins" DROP CONSTRAINT "FK_9125ec6d5c991705e61175dc21b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cs2"."skins" DROP CONSTRAINT "FK_35b23d32ed7212aa41c646b8ede"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339"`,
    );
    await queryRunner.query(`DROP TABLE "cs2"."cases"`);
    await queryRunner.query(`DROP TABLE "cs2"."case_skins"`);
    await queryRunner.query(`DROP TABLE "cs2"."skins"`);
    await queryRunner.query(`DROP TABLE "cs2"."openings"`);
    await queryRunner.query(`DROP TABLE "cs2"."collections"`);
    await queryRunner.query(`DROP TABLE "cs2"."weapons"`);
    await queryRunner.query(`DROP TABLE "tech"."program_languajes"`);
    await queryRunner.query(
      `DROP TYPE "tech"."program_languajes_difficulty_enum"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."credentials"`);
    await queryRunner.query(`DROP TABLE "task"."tasks"`);
    await queryRunner.query(`DROP TABLE "auth"."users"`);
    await queryRunner.query(`DROP TYPE "auth"."users_status_enum"`);
    await queryRunner.query(`DROP TABLE "enterprise"."subscriptions"`);
  }
}
