import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, Matches, MaxLength, MinLength } from 'class-validator'

export class UserUpdateMePayloadDto {
	@ApiProperty({
		description: 'Email of user',
		example: 'atest@email.com'
	})
	@IsEmail()
	@IsOptional()
	email?: string

	@ApiProperty({
		description: 'Password of user',
		example: 'Pass#123'
	})
	@MinLength(8, {
		message: 'password too short'
	})
	@MaxLength(20, {
		message: 'password too long'
	})
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak'
	})
	@IsOptional()
	password?: string
}