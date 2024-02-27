import { DefaultDatabaseEntity } from '@modules/database/entity/default-database.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { UUID } from '@modules/graphql/scalar/uuid.scalar'

@ObjectType()
export abstract class DefaultAttributes implements DefaultDatabaseEntity<DefaultAttributes> {
    @Field(() => UUID, {
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
