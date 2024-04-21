import {Field, InputType, OmitType} from '@nestjs/graphql'
import {ListInput} from '@modules/graphql/input/list.input'
import {IsNotEmpty, ValidateNested} from 'class-validator'
import {DatePeriodInput} from '@modules/graphql/input/date-period.input'
import {ETimeAggregation} from '@modules/stat/enum/time-aggregation.enum'

@InputType('TStatUserRegistrationHistoryInput')
export class StatUserRegistrationHistoryInput {
    @IsNotEmpty()
    @ValidateNested()
    @Field(() => DatePeriodInput, {
        description: 'Datetime period criteria',
        name: 'datePeriod',
    })
    datePeriod: DatePeriodInput

    @IsNotEmpty()
    @Field(() => ETimeAggregation, {
        description: 'Aggregation criteria',
        name: 'timeAggregation',
        nullable: true
    })
    timeAggregation: ETimeAggregation = ETimeAggregation.NO_AGG
}