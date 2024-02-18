import { Module } from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import appConfig from '@modules/common/config/app.config'
import databaseConfig from '@modules/common/config/database.config'
import swaggerConfig from '@modules/common/config/swagger.config'
import JwtConfig from '@modules/common/config/jwt.config'
import emailConfig from '@modules/common/config/email.config'
import {validate} from 'class-validator'
import {DatabaseModule} from '@modules/database/database.module'
import {JwtAlexModule} from '@modules/jwt/jwt-alex.module'
import {RoleModule} from '@modules/role/role.module'
import {BcryptModule} from '@modules/bcrypt/bcrypt.module'
import {UserModule} from '@modules/user/user.module'
import {AuthModule} from '@modules/auth/auth.module'
import {JwtAuthGuard} from '@modules/auth/guard/jwt-auth.guard'
import {APP_GUARD} from '@nestjs/core'
import {RoleGuard} from '@modules/role/guard/role.guard'
import {EmailModule} from '@modules/email/email.module'
import {CommandModule} from '@modules/command/command.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				`${process.cwd()}/.env.local`,
				`${process.cwd()}/.env`,
				`${process.cwd()}/.env.${process.env.NODE_ENV}`,
			],
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
