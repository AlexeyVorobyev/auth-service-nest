import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { ActiveUser } from '../common/decorator/active-user.decorator'
import { UniversalExceptionDto } from '../common/dto/universal-exception.dto'
import { MeResponseDto } from './dto/me-response.dto'
import { Roles } from '../common/decorator/roles.decorator'
import { ERole } from '../common/enum/role.enum'
import { UserCreatePayloadDto } from './dto/user-create-payload.dto'
import { UserCreateResponseDto } from './dto/user-create-response.dto'
import { UserGetAllPayloadDto } from './dto/user-get-all-payload.dto'
import { UserGetAllResponseDto } from './dto/user-get-all-response.dto'
import { IdParamDto } from '../common/dto/id-param.dto'
import { UserUpdateMePayloadDto } from '@modules/user/dto/user-update-me-payload.dto'
import { UserResponseDto } from '@modules/user/dto/user-response.dto'
import { UserUpdatePayloadDto } from '@modules/user/dto/user-update-payload.dto'


@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly usersService: UserService
	) {
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'Get logged in user\'s details',
		type: MeResponseDto
	})
	@ApiOperation({
		summary: 'Current user information endpoint',
		description: 'Provides user information.'
	})
	@ApiBearerAuth()
	@Roles(ERole.User, ERole.Moderator, ERole.Admin)
	@Get('me')
	async getMe(@ActiveUser('id') userId: string): Promise<MeResponseDto> {
		return this.usersService.getOne(userId)
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiForbiddenResponse({
		description: 'Forbidden',
		type: UniversalExceptionDto
	})
	@ApiConflictResponse({
		description: 'User with provided parameters exist in system',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'Current user successfully updated'
	})
	@ApiOperation({
		summary: 'Current user information update endpoint',
		description: 'Provides functionality of editing current user.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Patch('me')
	async updateMe(
		@ActiveUser('id') userId: string,
		@Body() userUpdateMeDto: UserUpdateMePayloadDto
	): Promise<void> {
		await this.usersService.updateMe(userId, userUpdateMeDto)
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiForbiddenResponse({
		description: 'Forbidden',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'Users list',
		type: UserGetAllResponseDto
	})
	@ApiOperation({
		summary: 'Users list endpoint',
		description: 'Provides functionality of getting list of users.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Get()
	async getAll(@Query() params: UserGetAllPayloadDto): Promise<UserGetAllResponseDto> {
		return this.usersService.getAll(params)
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiForbiddenResponse({
		description: 'Forbidden',
		type: UniversalExceptionDto
	})
	@ApiConflictResponse({
		description: 'User with provided parameters exist in system',
		type: UniversalExceptionDto
	})
	@ApiCreatedResponse({
		description: 'Created user data',
		type: UserCreateResponseDto
	})
	@ApiOperation({
		summary: 'User creation endpoint',
		description: 'Provides functionality of creating users evading sign-up system.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Post()
	async create(
		@ActiveUser('roles') userRoles: ERole[],
		@Body() userCreateDto: UserCreatePayloadDto
	): Promise<UserCreateResponseDto> {
		return this.usersService.create(userCreateDto, userRoles)
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiForbiddenResponse({
		description: 'Forbidden',
		type: UniversalExceptionDto
	})
	@ApiBadRequestResponse({
		description: 'User with provided id not found',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User information',
		type: UserResponseDto
	})
	@ApiOperation({
		summary: 'User information endpoint',
		description: 'Provides functionality of getting information about user by id.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Get(':id')
	async getOne(@Param() params: IdParamDto): Promise<UserResponseDto> {
		return this.usersService.getOne(params.id)
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiForbiddenResponse({
		description: 'Forbidden',
		type: UniversalExceptionDto
	})
	@ApiConflictResponse({
		description: 'User with provided parameters exist in system',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User successfully updated'
	})
	@ApiOperation({
		summary: 'User information update endpoint',
		description: 'Provides functionality of editing user by id.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Patch(':id')
	async update(
		@ActiveUser('roles') userRoles: ERole[],
		@Param() params: IdParamDto,
		@Body() userUpdateDto: UserUpdatePayloadDto
	): Promise<void> {
		await this.usersService.update(params.id, userUpdateDto, userRoles)
	}

	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
		type: UniversalExceptionDto
	})
	@ApiForbiddenResponse({
		description: 'Forbidden',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User with provided id deleted'
	})
	@ApiOperation({
		summary: 'User deletion endpoint',
		description: 'Provides functionality of deleting user by id.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Admin)
	@Delete(':id')
	async delete(@Param() params: IdParamDto): Promise<void> {
		await this.usersService.delete(params.id)
	}
}