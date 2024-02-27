import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType('TSignUpInput')
export class SignUpInput {
    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    @Field(() => String!, {
        description: 'Email of user'
    })
    readonly email: string

    @MinLength(8, {
        message: 'password too short'
    })
    @MaxLength(20, {
        message: 'password too long'
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    @IsNotEmpty()
    @Field(() => String!, {
        description: 'Password of user',
    })
    readonly password: string
}