import { ApiProperty } from '@nestjs/swagger'

export abstract class GetAllResponseDto<EntityDto> {
	@ApiProperty({
		description: 'List of entities',
	})
	list: EntityDto[]

	@ApiProperty({
		description: 'Total amount of elements in system',
		example: 10
	})
	totalElements: number

	@ApiProperty({
		description: 'Total amount of pages in system',
		example: 5
	})
	totalPages: number

	@ApiProperty({
		description: 'Current page',
		example: 1
	})
	currentPage: number

	@ApiProperty({
		description: 'ElementsPerPage',
		example: 10
	})
	elementsPerPage: number
}