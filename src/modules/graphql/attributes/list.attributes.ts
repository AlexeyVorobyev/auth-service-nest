import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { ListMetaAttributes } from '@modules/graphql/attributes/list-meta.attributes'

export function listAttributesFactory<Entity>(classRef: Type<Entity>) {
    @ObjectType()
    class ListAttributes {
        @Field(() => [classRef])
        public data: Entity[]

        @Field(() => ListMetaAttributes)
        public meta: ListMetaAttributes
    }

    return ListAttributes
}