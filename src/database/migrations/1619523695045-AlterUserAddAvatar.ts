import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserAddAvatar1619523695045 implements MigrationInterface {
  name = "AlterUserAddAvatar1619523695045";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
  }
}
