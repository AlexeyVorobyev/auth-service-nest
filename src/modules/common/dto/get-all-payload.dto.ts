import { IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator'
import { plainToInstance, Transform, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ESortDirection } from '@modules/common/enum/ESortDirection.enum'
import { SortDto } from '@modules/common/dto/sort.dto'
import { apiPayloadDatePeriodDtoAdapter } from '@modules/common/adapter/api-payload-date-period-dto.adapter'
import { DatePeriodDto } from '@modules/common/dto/date-period.dto'
import { apiPayloadSortDtoAdapter } from '@modules/common/adapter/api-payload-sort-dto.adapter'
import { apiPayloadToArrayAdapter } from '@modules/common/adapter/api-payload-to-array.adapter'

export abstract class GetAllPayloadDto {
    @ApiProperty({
        default: 0,
        required: false,
        type: Number,
    })
    @Min(0)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number = 0

    @ApiProperty({
        default: 5,
        required: false,
        type: Number,
    })
    @IsPositive()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    perPage?: number = 8

    @ApiProperty({
        default: '',
        required: false,
        type: String,
    })
    @IsString()
    @IsOptional()
    simpleFilter?: string

    @ApiProperty({
        description: 'Filter by entity id. Multiple criteria allowed with OR functionality',
        required: false,
        type: [String],
    })
    @IsOptional()
    @Transform((transformPayload) => (
        apiPayloadToArrayAdapter<string>(transformPayload)),
    )
    id?: string[]

    @ApiProperty({
        required: false,
        type: String,
        description: 'Datetime period criteria in the format: [createDateStart],[createDateEnd]',
        example: `${new Date(new Date().setFullYear(2023, 11, 1)).toISOString()},${new Date().toISOString()}`,
    })
    @ValidateNested()
    @IsOptional()
    @Transform((transformPayload) => apiPayloadDatePeriodDtoAdapter(transformPayload.value))
    createDatePeriod?: DatePeriodDto

    @ApiProperty({
        required: false,
        type: String,
        description: 'Datetime period criteria in the format: [updateDateStart],[updateDateEnd]',
        example: `${new Date(new Date().setFullYear(2023, 11, 1)).toISOString()},${new Date().toISOString()}`,
    })
    @ValidateNested()
    @IsOptional()
    @Transform((transformPayload) => apiPayloadDatePeriodDtoAdapter(transformPayload.value))
    updateDatePeriod?: DatePeriodDto

    @ApiProperty({
        required: false,
        type: String,
        isArray: true,
        description: 'Sorting criteria in the format: property,(ASC|DESC). Multiple sort criteria is supported',
        example: [`title,${ESortDirection.ascending}`, `subtitle,${ESortDirection.descending}`],
    })
    @IsOptional()
    @ValidateNested()
    @Transform((transformPayload) => (
        apiPayloadToArrayAdapter<SortDto>(transformPayload, (value) => apiPayloadSortDtoAdapter(value))),
    )
    sort?: SortDto[] = []
}