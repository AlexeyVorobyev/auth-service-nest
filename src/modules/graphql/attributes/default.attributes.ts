import { OperationMetaAttributes } from '@modules/graphql/attributes/operation-meta.attributes'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('TDefaultAttributes')
export class DefaultAttributes {
    @Field(() => OperationMetaAttributes!, {
        description: 'Status metadata',
    })
    operationMeta?: OperationMetaAttributes
}