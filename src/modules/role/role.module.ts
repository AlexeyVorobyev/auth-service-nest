import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from './entity/role.entity'
import { RoleRepository } from './repository/role.repository'

@Module({
	imports: [
		TypeOrmModule.forFeature([RoleEntity])
	],
	providers: [RoleService, RoleRepository],
	exports: [RoleService, RoleRepository]
})
export class RoleModule {}