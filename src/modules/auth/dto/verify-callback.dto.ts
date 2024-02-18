import { ApiProperty } from '@nestjs/swagger'

export class VerifyCallbackDto {
	@ApiProperty({
		description: 'Verification JWT token',
		required: true,
		type: String,
	})
	token: string

	@ApiProperty({
		description: 'redirect URL',
		required: true,
		type: String,
	})
	redirect: string
}