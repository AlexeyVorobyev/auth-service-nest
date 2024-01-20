import { Controller, Get, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { ActiveUser } from '../common/decorator/active-user.decorator'
import { UniversalExceptionDto } from '../common/dto/UniversalException.dto'
import { MeResponseDto } from './dto/me-response.dto'
import { Roles } from '../common/decorator/roles.decorator'
import { ERole } from '../common/enum/role.enum'


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
	@ApiForbiddenResponse({
		description: 'Forbidden',
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
		return this.usersService.getMe(userId)
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
		description: 'Get logged in user\'s details',
		type: MeResponseDto
	})
	@ApiOperation({
		summary: 'User creation endpoint',
		description: 'Provides functionality of creating users evading sign-up system.'
	})
	@ApiBearerAuth()
	@Roles(ERole.Moderator, ERole.Admin)
	@Post()
	async create(@ActiveUser('id') userId: string): Promise<any> {

	}
}