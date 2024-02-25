import { Module } from '@nestjs/common'
import { ExternalRoleModule } from '@modules/external-role/external-role.module'
import { UserModule } from '@modules/user/user.module'
import { CreateSuperUserCommand } from '@modules/command/create-super-user.command'

@Module({
    imports: [ExternalRoleModule, UserModule],
    providers: [CreateSuperUserCommand],
    exports: [CreateSuperUserCommand],
})
export class CommandModule {
}