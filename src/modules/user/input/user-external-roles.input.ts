import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType('TUserExternalRolesInput')
export class UserExternalRolesInput {
    @IsString()
    @IsUUID(4)
    @IsNotEmpty()
    @Field(() => String!)
    externalServiceId: string

    @IsString({each: true})
    @IsUUID(4, { each: true })
    @IsNotEmpty()
    @IsArray()
    @Field(() => [String]!)
    externalRolesId: string[]
}