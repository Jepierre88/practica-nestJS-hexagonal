import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775330122865 implements MigrationInterface {
    name = 'Migration1775330122865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enterprise"."subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subscription_type" character varying(50) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "enterprise"."subscriptions"`);
    }

}
