import { IsDateString, IsOptional } from 'class-validator'

export class DatePeriodDto {
	@IsDateString()
	@IsOptional()
	startDate?: Date

	@IsDateString()
	@IsOptional()
	endDate?: Date
}