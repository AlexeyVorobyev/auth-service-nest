import { ApiProperty } from '@nestjs/swagger'
import { ERole } from '@modules/common/enum/role.enum'
import { ExternalServiceResponseDto } from '@modules/external-service/dto/external-service-response.dto'

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

	@ApiProperty({
		description: 'User external services',
		type: [ExternalServiceResponseDto],
	})
	externalServices: ExternalServiceResponseDto[]

	@ApiProperty({
		description: 'Defines are user verified',
		example: true,
		type: Boolean
	})
	verified: boolean
}