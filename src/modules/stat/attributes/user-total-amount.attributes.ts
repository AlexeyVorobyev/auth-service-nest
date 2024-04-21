import {DefaultAttributes} from '@modules/graphql/attributes/default.attributes'
import {StatValueAttributes} from '@modules/stat/attributes/stat-value.attributes'
import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('TUserTotalAmountAttributes')
export class UserTotalAmountAttributes extends DefaultAttributes{
    @Field(() => Number, {
        name: 'data',
        description: 'stat data'
    })
    data: number
}