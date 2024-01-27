import { IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator'
import { plainToClass, plainToClassFromExist, plainToInstance, Transform, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ESortDirection } from '@src/common/enum/ESortDirection.enum'
import { SortDto } from '@src/common/dto/sort.dto'

export abstract class GetAllDto {
	@ApiProperty({
		default: 0,
		required: false,
		type: Number
	})
	@Type(() => Number)
	@Min(0)
	@IsOptional()
	page?: number = 0

	@ApiProperty({
		default: 5,
		required: false,
		type: Number
	})
	@Type(() => Number)
	@IsPositive()
	@IsOptional()
	perPage?: number = 8

	@ApiProperty({
		default: '',
		required: false,
		type: String,
	})
	@IsString()
	@Type(() => String)
	@IsOptional()
	simpleFilter?: string = ""

	@ApiProperty({
		required: false,
		type: String,
		isArray: true,
		description: 'Sorting criteria in the format: property,(ASC|DESC). Multiple sort criteria is supported',
		example: [`title,${ESortDirection.ascending}`, `subtitle,${ESortDirection.descending}`],
	})
	@IsOptional()
	@ValidateNested()
	@Transform((transformPayload) => {
		const transformItem = (item: unknown) => {
			if (typeof item === 'string') {
				const splitString = item.split(',')
				if (splitString.length !== 2) {
					return item
				}
				return {
					columnName: splitString[0],
					direction: splitString[1],
				}
			} else {
				return item
			}
		}

		if ((transformPayload.value instanceof Array)) {
			return transformPayload.value.map((item) => plainToInstance(SortDto, transformItem(item)))
		} else {
			return [plainToInstance(SortDto, transformItem(transformPayload.value))]
		}
	})
	sort?: SortDto[]
}