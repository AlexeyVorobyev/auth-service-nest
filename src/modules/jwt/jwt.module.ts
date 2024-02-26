import { Module } from '@nestjs/common'
import { JwtAccessModule } from '@modules/jwt/strategy/JwtAccess.module'
import { JwtRefreshModule } from '@modules/jwt/strategy/JwtRefresh.module'
import { JwtVerifyModule } from '@modules/jwt/strategy/JwtVerify.module'
import { JwtService } from '@modules/jwt/jwt.service'

@Module({
    imports: [
        JwtAccessModule,
        JwtRefreshModule,
        JwtVerifyModule,
    ],
    providers: [JwtService],
    exports: [JwtService],
})
export class JwtModule {
}