import { Module } from '@nestjs/common'
import { BaseRolesInit } from './base-roles.command'
import { RoleModule } from '../role/role.module'
import { CreateSuperUser } from '@src/command/create-super-user'
import { UserModule } from '@src/user/user.module'

@Module({
	imports: [RoleModule, UserModule],
	providers: [BaseRolesInit, CreateSuperUser],
	exports: [BaseRolesInit, CreateSuperUser]
})
export class CommandModule {}