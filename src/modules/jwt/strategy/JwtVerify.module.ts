import { JwtModule, JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => ({
			secret: configService.get('jwt.verifySecret'),
			signOptions: {
				expiresIn: configService.get('jwt.verifyTokenTtl') / 1000
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