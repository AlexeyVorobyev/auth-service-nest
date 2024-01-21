import { ApiProperty } from '@nestjs/swagger'

export class PaginationSwaggerDTO {
	@ApiProperty({
		default: 0,
		required: false,
		type: 'number'
	})
	page: number
	@ApiProperty({
		default: 5,
		required: false,
		type: 'number'
	})
	perPage: number
}