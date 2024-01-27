import { ApiProperty } from '@nestjs/swagger'
import { ERole } from '@src/common/enum/role.enum'

export class UserResponseDto {
	@ApiProperty({
		description: 'ID of user',
		example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c'
	})
	id: string

	@ApiProperty({
		description: 'Email of user',
		example: 'atest@email.com'
	})
	email: string

	@ApiProperty({
		description: 'Created date of user'
	})
	createdAt: Date

	@ApiProperty({
		description: 'Updated date of user'
	})
	updatedAt: Date

	@ApiProperty({
		description: 'User roles',
		example: [ERole.User],
		type: [String],
		enum: ERole
	})
	roles: ERole[]
}