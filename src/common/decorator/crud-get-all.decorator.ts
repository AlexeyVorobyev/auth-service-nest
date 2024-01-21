import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { SortSwaggerDto } from '../dto/sort.dto'
import { PaginationSwaggerDTO } from '../dto/pagination.dto'
import { SimpleFilterSwaggerDTO } from '../dto/simple-filter.dto'

export enum ECrudGetAllOption {
	sort = 'sort',
	pagination = 'pagination',
	simpleFilter = 'simpleFilter'
}

type TOption = `${ECrudGetAllOption}`

export function CrudGetAll(...options: TOption[]) {
	const decorators = Array.from(new Set(options)).map((option) => {
		switch (option) {
			case ECrudGetAllOption.sort:
				return ApiQuery({
					name: 'sort',
					required: false,
					type: SortSwaggerDto
				})
			case ECrudGetAllOption.pagination:
				return ApiQuery({
					name: 'pagination',
					required: false,
					type: PaginationSwaggerDTO
				})
			case ECrudGetAllOption.simpleFilter:
				return ApiQuery({
					name: 'simpleFilter',
					required: false,
					type: SimpleFilterSwaggerDTO
				})
		}
	})

	return applyDecorators(...decorators)
}