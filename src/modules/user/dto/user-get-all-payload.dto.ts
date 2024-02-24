import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { GetAllPayloadDto } from '@modules/common/dto/get-all-payload.dto'
import { ERole } from '@modules/common/enum/role.enum'

export class UserGetAllPayloadDto extends GetAllPayloadDto {
	@ApiProperty({
		description: 'Filter by user role',
		required: false,
		type: ERole,
		enum: ERole
	})
	@IsOptional()
	roleFilter?: ERole

	@ApiProperty({
		description: 'Filter by external service id. Multiple criteria allowed with OR functionality',
		required: false,
		type: [String],
	})
	@IsOptional()
	externalServiceFilter?: string[]
}