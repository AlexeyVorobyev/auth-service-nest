import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from './entity/role.entity'
import { RoleRepository } from './repository/role.repository'
import { ExternalRoleEntity } from '@modules/role/entity/external-role.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity, ExternalRoleEntity]),
    ],
    providers: [RoleService, RoleRepository],
    exports: [RoleService, RoleRepository],
})
export class RoleModule {
}