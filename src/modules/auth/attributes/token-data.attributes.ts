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
        description: 'Date, when access token will expire',
    })
    readonly accessTokenTTL: Date

    @Field(() => String!, {
        description: 'Refresh JWT token',
    })
    readonly refreshToken: string

    @Field(() => String!, {
        description: 'Date, when refresh token will expire',
    })
    readonly refreshTokenTTL: Date
}