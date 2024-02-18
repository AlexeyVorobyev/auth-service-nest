import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOkResponse, ApiOperation,
	ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Public } from '../common/decorator/public.decorator'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { AuthService } from './auth.serivce'
import { SignInResponseDto } from './dto/sign-in-response.dto'
import { RefreshDto } from './dto/refresh.dto'
import { RefreshResponseDto } from './dto/refresh-response.dto'
import { ActiveUser } from '../common/decorator/active-user.decorator'
import { UniversalExceptionDto } from '../common/dto/universal-exception.dto'
import {VerifyCallbackDto} from '@modules/auth/dto/verify-callback.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@ApiConflictResponse({
		description: 'User already exists',
		type: UniversalExceptionDto
	})
	@ApiBadRequestResponse({
		description: 'Return errors for invalid sign up fields',
		type: UniversalExceptionDto
	})
	@ApiCreatedResponse({
		description: 'User has been successfully signed up'
	})
	@ApiOperation({
		summary: 'Sign-up endpoint',
		description: 'Provides functionality of creating new user in system.'
	})
	@Public()
	@Post('sign-up')
	signUp(@Body() signUpDto: SignUpDto): Promise<void> {
		return this.authService.signUp(signUpDto)
	}

	@ApiBadRequestResponse({
		description: 'Return errors for invalid sign in fields',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User has been successfully signed in',
		type: SignInResponseDto
	})
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Sign-in endpoint',
		description: 'Allows to get JWT Tokens to logged user.'
	})
	@Public()
	@Post('sign-in')
	signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
		return this.authService.signIn(signInDto)
	}

	@ApiBadRequestResponse({
		description: 'Provided refreshToken are invalid or expired',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User successfully received new access and refresh token',
		type: RefreshResponseDto
	})
	@ApiOperation({
		summary: 'Refresh JWT tokens endpoint',
		description: 'Allows to refresh JWT Tokens to logged user.'
	})
	@Public()
	@Post('refresh')
	refresh(
		@ActiveUser('id') userId: string,
		@Body() refreshDto: RefreshDto
	): Promise<RefreshResponseDto> {
		return this.authService.refresh(refreshDto, userId)
	}

	@ApiUnauthorizedResponse({
		description: 'Provided accessToken are invalid or expired or accessToken not provided',
		type: UniversalExceptionDto
	})
	@ApiCreatedResponse({
		description: 'User successfully received confirmation email',
		type: RefreshResponseDto
	})
	@ApiOperation({
		summary: 'Resend confirmation email endpoint',
		description: 'Allows to send confirmation email to current user.'
	})
	@ApiBearerAuth()
	@Post('resend-confirmation-email')
	async resendConfirmationMail(@ActiveUser('id') userId: string) {
		await this.authService.resendConfirmationMail(userId)
	}

	@ApiUnauthorizedResponse({
		description: 'Provided verifyToken are invalid or expired or accessToken not provided',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User email successfully verified'
	})
	@ApiOperation({
		summary: 'Callback endpoint to verify email',
		description: 'Allows to verify email with provided token and then redirect user to main site'
	})
	@Public()
	@Get('verify-callback')
	async verifyCallback(@Query() params: VerifyCallbackDto) {
		await this.authService.verifyCallback(params.token, params.redirect)
	}

	@ApiUnauthorizedResponse({
		description: 'Provided accessToken are invalid or expired or verifyToken not provided',
		type: UniversalExceptionDto
	})
	@ApiOkResponse({
		description: 'User successfully authenticated'
	})
	@ApiOperation({
		summary: 'Service endpoint for services',
		description: 'Allows authentication of user.'
	})
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@Post('internal-auth')
	internalAuth(): void {
	}
}