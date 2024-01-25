import { ERole } from '@src/common/enum/role.enum'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator'
import { UserCreateDto } from '@src/user/dto/user-create.dto'

export class UserUpdateDto {
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

	@ApiProperty({
		description: 'Roles of user',
		example: [ERole.User],
		type: [String],
		enum: ERole
	})
	@IsArray()
	@IsOptional()
	roles?: ERole[]
}