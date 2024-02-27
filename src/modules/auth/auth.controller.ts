import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Public } from '../common/decorator/public.decorator'
import { AuthService } from './auth.serivce'
import { ActiveUser } from '../common/decorator/active-user.decorator'
import { UniversalExceptionDto } from '../common/dto/universal-exception.dto'
import { VerifyCallbackDto } from '@modules/auth/dto/verify-callback.dto'
import { JwtRestAuthGuard } from '@modules/common/guard/jwt-rest-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @ApiUnauthorizedResponse({
        description: 'Provided accessToken are invalid or expired or accessToken not provided',
        type: UniversalExceptionDto,
    })
    @ApiCreatedResponse({
        description: 'User successfully received confirmation email',
    })
    @ApiOperation({
        summary: 'Resend confirmation email endpoint',
        description: 'Allows to send confirmation email to current user.',
    })
    @ApiBearerAuth()
    @UseGuards(JwtRestAuthGuard)
    @Post('resend-confirmation-email')
    async resendConfirmationMail(@ActiveUser('id') userId: string) {
        await this.authService.resendConfirmationMail(userId)
    }

    @ApiUnauthorizedResponse({
        description: 'Provided verifyToken are invalid or expired or accessToken not provided',
        type: UniversalExceptionDto,
    })
    @ApiOkResponse({
        description: 'User email successfully verified',
    })
    @ApiOperation({
        summary: 'Callback endpoint to verify email',
        description: 'Allows to verify email with provided token and then redirect user to main site',
    })
    @Public()
    @Get('verify-callback')
    async verifyCallback(
        @Res() res: Response,
        @Query() params: VerifyCallbackDto,
    ) {
        await this.authService.verifyCallback(
            res,
            params.token,
            params.redirectSuccess,
            params.redirectFailure,
        )
    }
}