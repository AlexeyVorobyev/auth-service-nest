import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationExternalRolesToUser1708752047797 implements MigrationInterface {
    name = 'RelationExternalRolesToUser1708752047797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_role" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "external_role" ADD CONSTRAINT "FK_a6f6cf605529b34dd1fb02e54c6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_role" DROP CONSTRAINT "FK_a6f6cf605529b34dd1fb02e54c6"`);
        await queryRunner.query(`ALTER TABLE "external_role" DROP COLUMN "user_id"`);
    }

}
