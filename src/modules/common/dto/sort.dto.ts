import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { ESortDirection } from '@modules/common/enum/ESortDirection.enum'


export class SortDto {
	@IsString()
	@IsNotEmpty()
	columnName: string
	@IsString()
	@IsNotEmpty()
	@Matches(/^(ASC|DESC)$/g)
	direction: ESortDirection
}