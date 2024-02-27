import { Module } from '@nestjs/common'
import { DatabaseModule } from '@modules/database/database.module'
import { JwtModule } from '@modules/jwt/jwt.module'
import { ExternalRoleModule } from '@modules/external-role/external-role.module'
import { BcryptModule } from '@modules/bcrypt/bcrypt.module'
import { UserModule } from '@modules/user/user.module'
import { AuthModule } from '@modules/auth/auth.module'
import { EmailModule } from '@modules/email/email.module'
import { CommandModule } from '@modules/command/command.module'
import { ExternalServiceModule } from '@modules/external-service/external-service.module'
import { GraphqlModule } from '@modules/graphql/graphql.module'
import { RootResolver } from '@src/app.resolver'
import { ConfigModule } from '@modules/config/config.module'

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        ExternalRoleModule,
        UserModule,
        AuthModule,
        EmailModule,
        ExternalServiceModule,
        CommandModule,
        GraphqlModule,
    ],
    providers: [RootResolver]
})
export class AppModule {
}
