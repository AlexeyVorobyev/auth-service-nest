import { Global, Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from './entity/role.entity'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([RoleEntity]),
		UserModule
	],
	providers: [RoleService],
	exports: [RoleService]
})
export class RoleModule {}