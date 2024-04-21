import {DefaultAttributes} from '@modules/graphql/attributes/default.attributes'
import {StatValueAttributes} from '@modules/stat/attributes/stat-value.attributes'
import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('TUserRegistrationHistoryListAttributes')
export class UserRegistrationHistoryListAttributes extends DefaultAttributes{
    @Field(() => [StatValueAttributes], {
        name: 'data',
        description: 'stat data'
    })
    data: StatValueAttributes[]
}