import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { ESortDirection } from '@src/common/enum/ESortDirection.enum'


export class SortDto {
	@IsString()
	@IsNotEmpty()
	columnName: string
	@IsString()
	@IsNotEmpty()
	@Matches(/^(ASC|DESC)$/g)
	direction: `${ESortDirection}`
}