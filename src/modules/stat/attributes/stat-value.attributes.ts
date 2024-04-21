import {Field, ObjectType} from '@nestjs/graphql'
import {TStatValue} from '@modules/stat/type/stat-value.type'

@ObjectType('TStatValueAttributes')
export class StatValueAttributes implements TStatValue{
    @Field(() => Date, {
        description: 'Date of current value'
    })
    time: Date

    @Field(() => Number, {
        description: 'Value'
    })
    value: number
}