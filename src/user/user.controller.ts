import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth, ApiConflictResponse,
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
import { UserCreateDto } from './dto/user-create.dto'
import { UserCreateResponseDto } from './dto/user-create-response.dto'
import { CrudGetAll, ECrudGetAllOption } from '../common/decorator/crud-get-all.decorator'
import { UserGetAllDto } from './dto/user-get-all.dto'
import { UserGetAllResponseDto } from './dto/user-get-all-response.dto'
import { IdParamDto } from '../common/dto/id-param.dto'
import { UserResponseDto } from '@src/user/dto/user-response.dto'
import { UserUpdateDto } from '@src/user/dto/user-update.dto'
import { UserUpdateMeDto } from '@src/user/dto/user-update-me.dto'


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
		@Body() userUpdateMeDto: UserUpdateMeDto
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
	@CrudGetAll(
		ECrudGetAllOption.pagination,
		ECrudGetAllOption.simpleFilter,
		ECrudGetAllOption.sort
	)
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Get()
	async getAll(@Query() params: UserGetAllDto): Promise<UserGetAllResponseDto> {
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
		@Body() userCreateDto: UserCreateDto
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
		type: UserGetAllResponseDto
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
		@Body() userUpdateDto: UserUpdateDto
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