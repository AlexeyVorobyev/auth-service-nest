import { Module } from '@nestjs/common'
import { AuthService } from './auth.serivce'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/entity/user.entity'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { JwtAccessModule } from './jwt/JwtAccess.module'
import { JwtRefreshModule } from './jwt/JwtRefresh.module'
import { RoleEntity } from '../role/entity/role.entity'
import { RoleModule } from '../role/role.module'
import { UserService } from '../user/user.service'
import { UserModule } from '../user/user.module'
import { BcryptModule } from '../bcrypt/bcrypt.module'
import { EmailModule } from '@src/email/email.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtAccessModule,
		JwtRefreshModule,
		RoleModule,
		UserModule,
		BcryptModule,
		EmailModule
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [JwtAccessModule, JwtRefreshModule]
})
export class AuthModule {}