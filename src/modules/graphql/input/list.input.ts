import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { apiPayloadDatePeriodDtoAdapter } from '@modules/common/adapter/api-payload-date-period-dto.adapter'
import { Field, InputType, Int } from '@nestjs/graphql'
import { DatePeriodInput } from '@modules/graphql/input/date-period.input'
import { SortInput } from '@modules/graphql/input/sort.input'

@InputType()
export abstract class ListInput {
    @Min(0)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Field(() => Int, {
        description: 'Page of list',
        nullable: true,
    })
    page?: number = 0

    @IsPositive()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Field(() => Int, {
        description: 'Amount of elements per page',
        nullable: true,
    })
    perPage?: number = 8

    @IsString()
    @IsOptional()
    @Field(() => String, {
        description: 'SimpleFilter',
        nullable: true,
    })
    simpleFilter?: string

    @IsOptional()
    @Field(() => [Int], {
        description: 'Filter by entity id. Multiple criteria allowed with OR functionality',
        nullable: true,
    })
    id?: string[]

    @IsOptional()
    @Transform((transformPayload) => apiPayloadDatePeriodDtoAdapter(transformPayload.value))
    @Field(() => [DatePeriodInput], {
        description: 'Datetime period criteria',
        name: 'createDatePeriod',
        nullable: true,
    })
    createDatePeriod?: DatePeriodInput

    @IsOptional()
    @Transform((transformPayload) => apiPayloadDatePeriodDtoAdapter(transformPayload.value))
    @Field(() => [DatePeriodInput], {
        description: 'Datetime period criteria',
        name: 'updateDatePeriod',
        nullable: true,
    })
    updateDatePeriod?: DatePeriodInput

    @IsOptional()
    @Field(() => [SortInput], {
        description: 'Sorting criteria',
        nullable: true,
    })
    sort?: SortInput[] = []
}