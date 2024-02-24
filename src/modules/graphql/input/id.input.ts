import { IsNotEmpty, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql'

@InputType('TIdInput')
export class IdInput {
    @IsUUID(4)
    @IsNotEmpty()
    @Type(() => String)
    @Field(() => String!, {
        description: 'Identificatior property with uuid signature',
    })
    id: string
}