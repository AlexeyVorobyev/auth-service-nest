import { Module } from '@nestjs/common'
import appConfig from '@modules/config/config/app.config'
import databaseConfig from '@modules/config/config/database.config'
import swaggerConfig from '@modules/config/config/swagger.config'
import JwtConfig from '@modules/config/config/jwt.config'
import emailConfig from '@modules/config/config/email.config'
import { validate } from '@modules/common/validation/env.validation'
import {ConfigModule as ConfigNestModule} from '@nestjs/config'

@Module({
    imports: [
        ConfigNestModule.forRoot({
            envFilePath: `env/.env.${process.env.NODE_ENV}`,
            isGlobal: true,
            load: [
              appConfig,
                databaseConfig,
                swaggerConfig,
                JwtConfig,
                emailConfig
            ],
            validate: validate,
        }),
    ],
})
export class ConfigModule {
}