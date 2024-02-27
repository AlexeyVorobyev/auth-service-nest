import { Module } from '@nestjs/common'
import { AuthService } from './auth.serivce'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/entity/user.entity'
import { ExternalRoleModule } from '@modules/external-role/external-role.module'
import { UserModule } from '../user/user.module'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import { JwtModule } from '@modules/jwt/jwt.module'
import { EmailModule } from '@modules/email/email.module'
import { AuthMutationResolver } from '@modules/auth/resolver/auth-mutation.resolver'
import { AuthQueryResolver } from '@modules/auth/resolver/auth-query.resolver'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule,
        UserModule,
        BcryptModule,
        EmailModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthMutationResolver,
        AuthQueryResolver
    ],
})
export class AuthModule {
}