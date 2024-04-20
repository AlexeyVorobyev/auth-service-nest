import {Field, Int, ObjectType} from '@nestjs/graphql'
import {DefaultAttributes} from '@modules/graphql/attributes/default.attributes'
import {UUID} from '@modules/graphql/scalar/uuid.scalar'

@ObjectType('TDefaultAttributes')
export class DeleteAttributes extends DefaultAttributes {
    @Field(() => UUID, {
        description: 'id of deleted entity',
    })
    id: string
}