import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import swaggerConfig from './common/config/swagger.config'
import databaseConfig from './common/config/database.config'
import appConfig from './common/config/app.config'
import { validate } from './common/validation/env.validation'
import { UserModule } from './user/user.module'
import JwtConfig from './common/config/jwt.config'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard'
import { RoleModule } from './role/role.module'
import { RoleGuard } from './role/guard/role.guard'
import { BcryptModule } from './bcrypt/bcrypt.module'
import { CommandModule } from './command/command.module'
import { EmailModule } from '@src/email/email.module'
import emailConfig from '@src/common/config/email.config'
import * as process from 'process'
import { JwtAlexModule } from '@src/jwt/jwt-alex.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`${process.cwd()}/.env.local`, `${process.cwd()}/.env`],
			isGlobal: true,
			load: [appConfig, databaseConfig, swaggerConfig, JwtConfig, emailConfig],
			validate
		}),
		DatabaseModule,
		JwtAlexModule,
		RoleModule,
		BcryptModule,
		UserModule,
		AuthModule,
		EmailModule,
		CommandModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RoleGuard
		}
	]
})
export class AppModule {}
