import { JwtModule, JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
const ms = require('ms')

@Module({
	imports: [JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => ({
			secret: configService.get('jwt.refreshSecret'),
			signOptions: {
				expiresIn: ms(configService.get('jwt.refreshTokenTtl'))
			}
		})
	})],
	providers: [{
		provide: 'JwtRefreshService',
		useExisting: JwtService
	}],
	exports: ['JwtRefreshService']
})
export class JwtRefreshModule {}