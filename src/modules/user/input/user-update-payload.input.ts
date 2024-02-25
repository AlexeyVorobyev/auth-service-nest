import { Field, InputType } from '@nestjs/graphql'
import {
	IsArray,
	IsBoolean,
	IsEmail, IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator'
import { ERole } from '@modules/common/enum/role.enum'
import { Type } from 'class-transformer'

@InputType('TUserUpdatePayloadInput')
export class UserUpdatePayloadInput {
	@IsEmail()
	@IsOptional()
	@Field(() => String, {
		description: 'Email of user',
		nullable: true
	})
	email?: string

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
	@Field(() => String, {
		description: 'Password of user',
		nullable: true
	})
	password?: string

	@Type(() => String)
	@IsString()
	@IsEnum(ERole)
	@IsOptional()
	@Field(() => ERole!, {
		description: 'Role of user',
	})
	role?: ERole

	@Field(() => Boolean, {
		description: 'Defines are user verified',
		nullable: true
	})
	@IsOptional()
	@IsBoolean()
	verified?: boolean
}