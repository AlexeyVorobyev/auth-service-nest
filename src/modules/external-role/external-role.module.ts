import { Module } from '@nestjs/common'
import { ExternalRoleService } from './external-role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExternalRoleEntity } from '@modules/external-role/entity/external-role.entity'
import { ExternalRoleRepository } from '@modules/external-role/repository/external-role.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([ExternalRoleEntity]),
    ],
    providers: [ExternalRoleService, ExternalRoleRepository],
    exports: [ExternalRoleService, ExternalRoleRepository],
})
export class ExternalRoleModule {
}