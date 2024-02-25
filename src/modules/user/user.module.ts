import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entity/user.entity'
import { UserService } from './user.service'
import { ExternalRoleModule } from '@modules/external-role/external-role.module'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import { UserRepository } from './repository/user.repository'
import { UserQueryResolver } from '@modules/user/resolver/user-query.resolver'
import { JwtAlexModule } from '@modules/jwt/jwt-alex.module'
import { UserMutationResolver } from '@modules/user/resolver/user-mutation.resolver'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        ExternalRoleModule,
        BcryptModule,
        JwtAlexModule,
    ],
    providers: [UserService, UserRepository, UserQueryResolver, UserMutationResolver],
    exports: [UserService, UserRepository, UserQueryResolver, UserMutationResolver],
})
export class UserModule {
}