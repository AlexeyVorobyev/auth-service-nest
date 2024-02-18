import { Module } from '@nestjs/common'
import { AuthService } from './auth.serivce'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/entity/user.entity'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import {JwtAlexModule} from '@modules/jwt/jwt-alex.module'
import {EmailModule} from '@modules/email/email.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtAlexModule,
		RoleModule,
		UserModule,
		BcryptModule,
		EmailModule
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}