import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

@ObjectType('TTokenDataAttributes')
export class TokenDataAttributes {
    @Field(() => String!, {
        description: 'Access JWT token',
    })
    readonly accessToken: string

    @Field(() => String!, {
        description: 'Timestamp, when access token will expire in UTC',
    })
    readonly accessTokenTTL: number

    @Field(() => String!, {
        description: 'Refresh JWT token',
    })
    readonly refreshToken: string

    @Field(() => String!, {
        description: 'Timestamp, when refresh token will expire in UTC',
    })
    readonly refreshTokenTTL: number
}