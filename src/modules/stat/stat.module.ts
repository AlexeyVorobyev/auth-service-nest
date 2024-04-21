import {Module} from '@nestjs/common'
import {UserModule} from '@modules/user/user.module'
import {JwtModule} from '@modules/jwt/jwt.module'
import {StatService} from '@modules/stat/stat.service'
import {StatQueryResolver} from '@modules/stat/resolver/stat-query.resolver'

@Module({
    imports: [
        UserModule,
        JwtModule,
    ],
    providers: [
        StatService,
        StatQueryResolver
    ],
})
export class StatModule {
}