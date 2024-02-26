import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { Constructor } from '@modules/database/factory/abstract-typeorm-repository.factory'
import { UUID } from '@modules/graphql/scalar/uuid.scalar'

export function UpdateEntityInputFactory<Payload>(classRef: Constructor<Payload>) {
    @InputType('TUpdateEntityInput')
    abstract class UpdateEntityInput {
        @IsUUID(4)
        @IsNotEmpty()
        @Field(() => UUID!, {
            description: 'Identificatior property with uuid signature',
        })
        id: string

        @Field(() => classRef)
        payload: Payload
    }

    return UpdateEntityInput
}