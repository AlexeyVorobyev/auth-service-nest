import { Module } from '@nestjs/common'
import { BaseRolesInitCommand } from './base-roles.command'
import { RoleModule } from '../role/role.module'
import { CreateSuperUserCommand } from '@src/command/create-super-user.command'
import { UserModule } from '@src/user/user.module'

@Module({
	imports: [RoleModule, UserModule],
	providers: [BaseRolesInitCommand, CreateSuperUserCommand],
	exports: [BaseRolesInitCommand, CreateSuperUserCommand]
})
export class CommandModule {}