import { IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator'
import { plainToClass, Transform, Type } from 'class-transformer'
import { SortDto } from './sort.dto'

export abstract class GetAllDto {
	@Type(() => Number)
	@IsOptional()
	@Min(0)
	page?: number = 0

	@Type(() => Number)
	@IsOptional()
	@IsPositive()
	perPage?: number = 8

	@IsString()
	@Type(() => String)
	simpleFilter?: string = ""

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
			return transformPayload.value.map((item) => plainToClass(SortDto, transformItem(item)))
		} else {
			return [plainToClass(SortDto, transformItem(transformPayload.value))]
		}
	})
	sort?: SortDto[]
}