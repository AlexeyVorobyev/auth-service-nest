import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
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
		summary: 'User information endpoint',
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
	@ApiOkResponse({
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
		type: UserGetAllResponseDto,
	})
	@ApiOperation({
		summary: 'User information endpoint',
		description: 'Provides functionality of getting information about user.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Get(':id')
	async getOne(@Param() params: IdParamDto) {
		return this.usersService.getOne(params.id)
	}
}