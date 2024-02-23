import { MigrationInterface, QueryRunner } from 'typeorm'
import * as process from 'process'
import { BcryptService } from '@modules/bcrypt/bcrypt.service'

const bcryptService = new BcryptService()

export class SuperUser1708474687116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcryptService.hash(process.env.ADMIN_PASSWORD)
        await queryRunner.query(
            `
                INSERT INTO public.user (email, password)
                VALUES ($1, $2);
            `,
            [process.env.ADMIN_EMAIL, hashedPassword],
        )
        await queryRunner.query(
            `
                INSERT INTO user_role (user_id, role_id)
                SELECT "user".id,
                       role.id
                FROM "user"
                         CROSS JOIN role
                WHERE "user".email = $1;
            `,
            [process.env.ADMIN_EMAIL]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE public.user_role`)
        await queryRunner.query(`TRUNCATE public.user`)
    }

}
