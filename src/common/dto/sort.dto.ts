import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export enum ESortDirection {
	ascending = 'ASC',
	descending = 'DESC'
}

export class SortSwaggerDto {
	@ApiProperty({
		required: false,
		type: 'string',
		isArray: true,
		description: 'Sorting criteria in the format: property,(ASC|DESC). Multiple sort criteria is supported',
		example: [`title,${ESortDirection.ascending}`, `subtitle,${ESortDirection.descending}`],
	})
	sort: string[]
}

export class SortDto {
	@IsString()
	@IsNotEmpty()
	columnName: string
	@IsString()
	@IsNotEmpty()
	@Matches(/^(ASC|DESC)$/g)
	direction: `${ESortDirection}`
}