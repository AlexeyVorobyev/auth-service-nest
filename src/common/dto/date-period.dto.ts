import { IsDateString, IsOptional } from 'class-validator'

export class DatePeriodDto {
	@IsDateString()
	@IsOptional()
	startDate: Date

	@IsOptional()
	@IsDateString()
	endDate: Date
}