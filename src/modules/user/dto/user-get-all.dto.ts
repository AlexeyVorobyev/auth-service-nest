import { IsOptional, ValidateNested } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { apiPayloadDatePeriodDtoAdapter } from '@modules/common/adapter/api-payload-date-period-dto.adapter'
import { DatePeriodDto } from '@modules/common/dto/date-period.dto'
import { GetAllDto } from '@modules/common/dto/get-all.dto'
import { ERole } from '@modules/common/enum/role.enum'

export class UserGetAllDto extends GetAllDto {
	@ApiProperty({
		description: 'Filter by user role',
		required: false,
		type: ERole,
		enum: ERole
	})
	@IsOptional()
	roleFilter?: ERole

	@ApiProperty({
		required: false,
		type: String,
		description: 'Datetime period criteria in the format: [createDateStart],[createDateEnd]',
		example: `${new Date(new Date().setFullYear(2023,11,1)).toISOString()},${new Date().toISOString()}`
	})
	@ValidateNested()
	@IsOptional()
	@Transform(apiPayloadDatePeriodDtoAdapter)
	createDatePeriod?: DatePeriodDto

	@ApiProperty({
		required: false,
		type: String,
		description: 'Datetime period criteria in the format: [updateDateStart],[updateDateEnd]',
		example: `${new Date(new Date().setFullYear(2023,11,1)).toISOString()},${new Date().toISOString()}`
	})
	@ValidateNested()
	@IsOptional()
	@Transform(apiPayloadDatePeriodDtoAdapter)
	updateDatePeriod?: DatePeriodDto
}