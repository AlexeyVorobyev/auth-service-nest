import { JwtModule, JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
const ms = require('ms')

@Module({
	imports: [JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => ({
			secret: configService.get('jwt.verifySecret'),
			signOptions: {
				expiresIn: ms(configService.get('jwt.verifyTokenTtl'))
			}
		})
	})],
	providers: [{
		provide: 'JwtVerifyService',
		useExisting: JwtService
	}],
	exports: ['JwtVerifyService']
})
export class JwtVerifyModule {}