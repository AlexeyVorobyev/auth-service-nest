import { ERole } from '@src/common/enum/role.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator'

export class UserCreateDto {
	@ApiProperty({
		description: 'Email of user',
		example: 'atest@email.com'
	})
	@IsEmail()
	@IsNotEmpty()
	email: string

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
	@IsNotEmpty()
	password: string

	@ApiProperty({
		description: 'Roles of user',
		example: [ERole.User],
		type: [String],
		enum: ERole
	})
	roles: ERole[]
}