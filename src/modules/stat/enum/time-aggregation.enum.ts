import {registerEnumType} from '@nestjs/graphql'

export enum ETimeAggregation {
    DAY = 'DAY',
    /** Час */
    HOUR = 'HOUR',
    /** Минута */
    MINUTE = 'MINUTE',
    /** Месяц */
    MONTH = 'MONTH',
    /** Без агрегации */
    NO_AGG = 'NO_AGG',
    /** Неделя */
    WEEK = 'WEEK',
    /** Год */
    YEAR = 'YEAR'
}

registerEnumType(ETimeAggregation, {
    name: 'ETimeAggregation',
    description: 'Aggregation criteria'
})