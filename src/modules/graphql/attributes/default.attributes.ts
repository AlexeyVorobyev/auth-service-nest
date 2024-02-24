import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export abstract class DefaultAttributes implements DefaultDatabaseEntity<DefaultAttributes> {
    @Field(() => ID, {
        description: 'Entity id in UUID format',
    })
    public id: string

    @Field(() => Date, {
        description: 'Entity creation datetime',
    })
    public createdAt: Date

    @Field(() => Date, {
        description: 'Entity last update datetime',
    })
    public updatedAt: Date
}
