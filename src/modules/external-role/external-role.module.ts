import { Module } from '@nestjs/common'
import { ExternalRoleService } from './external-role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExternalRoleEntity } from '@modules/external-role/entity/external-role.entity'
import { ExternalRoleRepository } from '@modules/external-role/repository/external-role.repository'
import { JwtModule } from '@modules/jwt/jwt.module'
import { ExternalRoleQueryResolver } from '@modules/external-role/resolver/external-role-query.resolver'
import { ExternalRoleMutationResolver } from '@modules/external-role/resolver/external-role-mutation.resolver'

@Module({
    imports: [
        TypeOrmModule.forFeature([ExternalRoleEntity]),
        JwtModule,
    ],
    providers: [
        ExternalRoleService,
        ExternalRoleRepository,
        ExternalRoleQueryResolver,
        ExternalRoleMutationResolver,
    ],
    exports: [
        ExternalRoleService,
        ExternalRoleRepository,
        ExternalRoleQueryResolver,
        ExternalRoleMutationResolver,
    ],
})
export class ExternalRoleModule {
}