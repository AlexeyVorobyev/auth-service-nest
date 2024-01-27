import { GetAllDto } from '@src/common/dto/get-all.dto'
import { IsOptional } from 'class-validator'
import { ERole } from '@src/common/enum/role.enum'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

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
}