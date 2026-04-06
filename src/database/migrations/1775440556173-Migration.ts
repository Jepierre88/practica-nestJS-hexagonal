import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1775440556173 implements MigrationInterface {
  name = 'Migration1775440556173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."users" ADD "subscription_id" uuid`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_subscription_type" ON "enterprise"."subscriptions" ("subscription_type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "enterprise"."idx_subscription_type"`);
    await queryRunner.query(
      `ALTER TABLE "auth"."users" DROP COLUMN "subscription_id"`,
    );
  }
}
