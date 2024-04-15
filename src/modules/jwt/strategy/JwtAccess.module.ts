import {JwtModule, JwtService} from '@nestjs/jwt'
import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import fs = require('fs')
import * as path from 'node:path'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: fs.readFileSync( path.resolve('keys/rsa.key'), 'utf8'),
        publicKey: fs.readFileSync(path.resolve('keys/rsa.key.pub'), 'utf8'),
        signOptions: {
          expiresIn: configService.get<number>('jwt.accessTokenTtl') / (1000 * 2),
          algorithm: 'RS256',
        },
      }),
    })],
  providers: [{
    provide: 'JwtAccessService',
    useExisting: JwtService,
  }],
  exports: ['JwtAccessService'],
})
export class JwtAccessModule {
}