import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

@InputType('TUpdateEntityInput')
export abstract class UpdateEntityInput<Payload> {
    @IsUUID(4)
    @IsNotEmpty()
    @Type(() => String)
    @Field(() => String!, {
        description: 'Identificatior property with uuid signature',
    })
    id: string

    // @Field(() => Payload)
    // payload: Payload
}