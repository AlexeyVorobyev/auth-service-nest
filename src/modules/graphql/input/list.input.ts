import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Field, InputType, Int } from '@nestjs/graphql'
import { DatePeriodInput } from '@modules/graphql/input/date-period.input'
import { SortInput } from '@modules/graphql/input/sort.input'
import { UUID } from '@modules/graphql/scalar/uuid.scalar'

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
    @IsUUID(4, { each: true })
    @IsString({ each: true })
    @Field(() => [UUID], {
        description: 'Filter by entity id. Multiple criteria allowed with OR functionality',
        nullable: true,
    })
    id?: string[]

    @IsOptional()
    @ValidateNested()
    @Field(() => DatePeriodInput, {
        description: 'Datetime period criteria',
        name: 'createDatePeriod',
        nullable: true,
    })
    createDatePeriod?: DatePeriodInput

    @IsOptional()
    @ValidateNested()
    @Field(() => DatePeriodInput, {
        description: 'Datetime period criteria',
        name: 'updateDatePeriod',
        nullable: true,
    })
    updateDatePeriod?: DatePeriodInput

    @IsOptional()
    @ValidateNested({ each: true })
    @Field(() => [SortInput], {
        description: 'Sorting criteria',
        nullable: true,
    })
    sort?: SortInput[] = []
}