import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOpeningCases1775579439342 implements MigrationInterface {
    name = 'AddOpeningCases1775579439342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cs2"."opening_cases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "opening_id" uuid NOT NULL, "case_id" uuid NOT NULL, "result_skin_id" uuid NOT NULL, CONSTRAINT "PK_4c76f7c822fe4c179e8662a758e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cs2"."opening_cases" ADD CONSTRAINT "FK_ca9e7fedeb0b125fc814e8a36ef" FOREIGN KEY ("opening_id") REFERENCES "cs2"."openings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cs2"."opening_cases" ADD CONSTRAINT "FK_b35aff07f53e276fbf1b4307c9c" FOREIGN KEY ("case_id") REFERENCES "cs2"."cases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cs2"."opening_cases" ADD CONSTRAINT "FK_a85f953db07562129116643b1cb" FOREIGN KEY ("result_skin_id") REFERENCES "cs2"."skins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cs2"."opening_cases" DROP CONSTRAINT "FK_a85f953db07562129116643b1cb"`);
        await queryRunner.query(`ALTER TABLE "cs2"."opening_cases" DROP CONSTRAINT "FK_b35aff07f53e276fbf1b4307c9c"`);
        await queryRunner.query(`ALTER TABLE "cs2"."opening_cases" DROP CONSTRAINT "FK_ca9e7fedeb0b125fc814e8a36ef"`);
        await queryRunner.query(`DROP TABLE "cs2"."opening_cases"`);
    }

}
