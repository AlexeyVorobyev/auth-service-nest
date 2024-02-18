import { Module } from '@nestjs/common'
import { JwtAccessModule } from '@modules/jwt/strategy/JwtAccess.module'
import { JwtRefreshModule } from '@modules/jwt/strategy/JwtRefresh.module'
import { JwtVerifyModule } from '@modules/jwt/strategy/JwtVerify.module'
import { JwtAlexService } from '@modules/jwt/jwt-alex.service'

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