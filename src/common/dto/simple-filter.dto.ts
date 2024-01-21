import { ApiProperty } from '@nestjs/swagger'

export class SimpleFilterSwaggerDTO {
	@ApiProperty({
		default: '',
		required: false,
		type: 'string',
	})
	simpleFilter: string
}