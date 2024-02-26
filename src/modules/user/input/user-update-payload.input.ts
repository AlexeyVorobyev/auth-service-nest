import { Field, InputType } from '@nestjs/graphql'
import {
	IsArray,
	IsBoolean,
	IsEmail, IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString, IsUUID,
	Matches,
	MaxLength,
	MinLength, ValidateNested,
} from 'class-validator'
import { ERole } from '@modules/common/enum/role.enum'
import { Type } from 'class-transformer'
import { UserExternalRolesInput } from '@modules/user/input/user-external-roles.input'

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
		nullable: true
	})
	role?: ERole

	@Field(() => Boolean, {
		description: 'Defines are user verified',
		nullable: true
	})
	@IsOptional()
	@IsBoolean()
	verified?: boolean

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@IsUUID(4, { each: true })
	@Field(() => [String], {
		description: 'Defines user connected external services',
		nullable: true
	})
	externalServicesId?: string[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Field(() => [UserExternalRolesInput], {
		description: 'Defines user external roles in connected external services',
		nullable: true
	})
	externalRoles?: UserExternalRolesInput[]
}