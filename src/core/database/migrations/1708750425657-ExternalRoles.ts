import { MigrationInterface, QueryRunner } from "typeorm";

export class ExternalRoles1708750425657 implements MigrationInterface {
    name = 'ExternalRoles1708750425657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "external_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "external_service_id" uuid, CONSTRAINT "PK_b1188610d12a777916fb8f75ead" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "external_role" ADD CONSTRAINT "FK_52839e18c8296c5a3a11483819d" FOREIGN KEY ("external_service_id") REFERENCES "external_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_role" DROP CONSTRAINT "FK_52839e18c8296c5a3a11483819d"`);
        await queryRunner.query(`DROP TABLE "external_role"`);
    }

}
