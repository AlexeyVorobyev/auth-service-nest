import { Module } from '@nestjs/common'
import { DatabaseModule } from '@modules/database/database.module'
import { ExternalRoleModule } from '@modules/external-role/external-role.module'
import { UserModule } from '@modules/user/user.module'
import { AuthModule } from '@modules/auth/auth.module'
import { EmailModule } from '@modules/email/email.module'
import { CommandModule } from '@modules/command/command.module'
import { ExternalServiceModule } from '@modules/external-service/external-service.module'
import { GraphqlModule } from '@modules/graphql/graphql.module'
import { RootResolver } from '@src/app.resolver'
import { ConfigModule } from '@modules/config/config.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { OperationMetaInterceptor } from '@modules/graphql/interceptor/operation-meta.interceptor'
import {StatModule} from '@modules/stat/stat.module'

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
        StatModule
    ],
    providers: [
        RootResolver,
    ],
})
export class AppModule {
}
