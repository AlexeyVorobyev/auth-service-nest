import { Module } from '@nestjs/common'
import { BaseRolesInitCommand } from './base-roles.command'
import { RoleModule } from '../role/role.module'
import { UserModule } from '@modules/user/user.module'
import { CreateSuperUserCommand } from '@modules/command/create-super-user.command'

@Module({
	imports: [RoleModule, UserModule],
	providers: [BaseRolesInitCommand, CreateSuperUserCommand],
	exports: [BaseRolesInitCommand, CreateSuperUserCommand]
})
export class CommandModule {}