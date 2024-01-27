import { GetAllDto } from '@src/common/dto/get-all.dto'
import { IsOptional, ValidateNested } from 'class-validator'
import { ERole } from '@src/common/enum/role.enum'
import { plainToClass, plainToClassFromExist, plainToInstance, Transform, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ESortDirection } from '@src/common/enum/ESortDirection.enum'
import { DatePeriodDto } from '@src/common/dto/date-period.dto'
import { SortDto } from '@src/common/dto/sort.dto'
import { apiPayloadDatePeriodDtoAdapter } from '@src/common/adapter/api-payload-date-period-dto.adapter'

export class UserGetAllDto extends GetAllDto {
	@ApiProperty({
		description: 'Filter by user role',
		required: false,
		type: ERole,
		enum: ERole
	})
	@Type(() => String)
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