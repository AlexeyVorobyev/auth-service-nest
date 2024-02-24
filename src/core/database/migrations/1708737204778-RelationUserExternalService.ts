import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserExternalService1708737204778 implements MigrationInterface {
    name = 'RelationUserExternalService1708737204778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_external_service" ("user_id" uuid NOT NULL, "external_service_id" uuid NOT NULL, CONSTRAINT "PK_7148ef97c2c53582574d020ab6f" PRIMARY KEY ("user_id", "external_service_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ab14c41aab4b66f578bbada0e" ON "user_external_service" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_035a43c945ad57d74139d1b90f" ON "user_external_service" ("external_service_id") `);
        await queryRunner.query(`ALTER TABLE "user_external_service" ADD CONSTRAINT "FK_1ab14c41aab4b66f578bbada0e4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_external_service" ADD CONSTRAINT "FK_035a43c945ad57d74139d1b90f8" FOREIGN KEY ("external_service_id") REFERENCES "external_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_external_service" DROP CONSTRAINT "FK_035a43c945ad57d74139d1b90f8"`);
        await queryRunner.query(`ALTER TABLE "user_external_service" DROP CONSTRAINT "FK_1ab14c41aab4b66f578bbada0e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_035a43c945ad57d74139d1b90f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ab14c41aab4b66f578bbada0e"`);
        await queryRunner.query(`DROP TABLE "user_external_service"`);
    }

}
