import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('TStatSummaryAttributes')
export class StatSummaryAttributes{
    @Field(() => Number, {
        description: 'min',
        nullable: true
    })
    min: number

    @Field(() => Number, {
        description: 'max',
        nullable: true
    })
    max: number

    @Field(() => Number, {
        description: 'mean',
        nullable: true
    })
    mean: number

    @Field(() => Number, {
        description: 'last',
        nullable: true
    })
    last: number

    @Field(() => Number, {
        description: 'sum',
        nullable: true
    })
    sum: number
}