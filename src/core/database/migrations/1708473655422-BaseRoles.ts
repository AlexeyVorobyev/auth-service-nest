import { MigrationInterface, QueryRunner } from 'typeorm'
import { ERole } from '@modules/common/enum/role.enum'

export class BaseRoles1708473655422 implements MigrationInterface {
    name = 'BaseRoles1708473655422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const item of Array.from(Object.values(ERole))) {
            await queryRunner.query(
                `
                    INSERT INTO public.role (id, name, description)
                    VALUES (DEFAULT, $1, null);
                `,
                [item],
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE public.role`)
    }

}
