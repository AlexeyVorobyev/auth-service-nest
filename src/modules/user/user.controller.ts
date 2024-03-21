import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from '@modules/user/user.service'
import { UniversalExceptionDto } from '@modules/common/dto/universal-exception.dto'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'
import { JwtRestAuthGuard } from '@modules/common/guard/jwt-rest-auth.guard'
import { RoleRestGuard } from '@modules/common/guard/role-rest.guard'
import { ActiveUser } from '@modules/common/decorator/active-user.decorator'
import { UserRestAttributes } from '@modules/user/attributes/user-rest.attributes'

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
        type: UserRestAttributes
    })
    @ApiOperation({
        summary: 'Current user information endpoint',
        description: 'Provides user information.'
    })
    @ApiBearerAuth()
    @UseGuards(JwtRestAuthGuard, RoleRestGuard)
    @Roles(ERole.User, ERole.Moderator, ERole.Admin)
    @Get('me')
    async getMe(@ActiveUser('id') userId: string): Promise<UserRestAttributes> {
        return this.usersService.getOne(userId)
    }
}