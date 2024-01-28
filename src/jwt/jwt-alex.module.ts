import { Module } from '@nestjs/common'
import { JwtAccessModule } from '@src/jwt/strategy/JwtAccess.module'
import { JwtRefreshModule } from '@src/jwt/strategy/JwtRefresh.module'
import { JwtVerifyModule } from '@src/jwt/strategy/JwtVerify.module'
import { JwtAlexService } from '@src/jwt/jwt-alex.service'

@Module({
	imports: [
		JwtAccessModule,
		JwtRefreshModule,
		JwtVerifyModule
	],
	providers: [JwtAlexService],
	exports: [JwtAlexService]
})
export class JwtAlexModule {}