import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import jwtConfig from '../common/config/jwt.config'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInResponseDto } from './dto/sign-in-response.dto'
import { Builder } from 'builder-pattern'
import { RefreshDto } from './dto/refresh.dto'
import { RefreshResponseDto } from './dto/refresh-response.dto'
import { DEFAULT_ROLE } from '../common/constant'
import { UniversalError } from '../common/class/universal-error'
import { EUniversalExceptionType } from '../common/enum/exceptions'
import { UserService } from '../user/user.service'
import { UserCreateDto } from '../user/dto/user-create.dto'
import { UserRepository } from '../user/repository/user.repository'
import { EmailService } from '@src/email/email.service'
import { JwtAlexService } from '@src/jwt/jwt-alex.service'
import { EJwtStrategy } from '@src/common/enum/jwt-strategy.enum'

@Injectable()
export class AuthService {
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		@Inject(BcryptService)
		private readonly bcryptService: BcryptService,
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(UserRepository)
		private readonly userRepository: UserRepository,
		@Inject(EmailService)
		private readonly emailService: EmailService,
		@Inject(JwtAlexService)
		private readonly jwtAlexService: JwtAlexService
	) {
	}

	async signUp(signUpDto: SignUpDto): Promise<void> {
		const userCreateDtoBuilder = Builder(UserCreateDto)
		userCreateDtoBuilder
			.email(signUpDto.email)
			.password(signUpDto.password)
			.roles([DEFAULT_ROLE])
			.verified(false)
		const userCreateResponseDtoInstance = await this.userService.create(userCreateDtoBuilder.build())
		const userEntityInstance = await this.userRepository.getOne({ id: userCreateResponseDtoInstance.id })
		await this.emailService.sendUserConfirmation(
			userEntityInstance,
			await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.verify)
		)
	}

	async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
		const { email, password } = signInDto

		const userEntityInstance = await this.userRepository.getOne({ email: email })
		if (!userEntityInstance) {
			Builder(UniversalError)
				.messages(['Invalid email'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const isPasswordMatch = await this.bcryptService.compare(
			password,
			userEntityInstance.password
		)
		if (!isPasswordMatch) {
			Builder(UniversalError)
				.messages(['Invalid password'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const SignInResponseBuilder = Builder(SignInResponseDto)
		SignInResponseBuilder
			.accessToken(await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.access))
			.accessTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.accessTokenTtl))
			.refreshToken(await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.refresh))
			.refreshTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.refreshTokenTtl))
		return SignInResponseBuilder.build()
	}

	async refresh(refreshDto: RefreshDto, userId: string): Promise<RefreshResponseDto> {
		await this.jwtAlexService.verifyToken(refreshDto.refreshToken,EJwtStrategy.refresh)

		const userEntityInstance = await this.userRepository.getOne({ id: userId })
		if (!userEntityInstance) {
			Builder(UniversalError)
				.messages(['Invalid userId'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const RefreshResponseBuilder = Builder(RefreshResponseDto)
		RefreshResponseBuilder
			.accessToken(await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.access))
			.accessTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.accessTokenTtl))
			.refreshToken(await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.refresh))
			.refreshTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.refreshTokenTtl))
		return RefreshResponseBuilder.build()
	}

	async resendConfirmationMail(userId: string) {
		const userEntityInstance = await this.userRepository.getOne({ id: userId })
		await this.emailService.sendUserConfirmation(
			userEntityInstance,
			await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.verify)
		)
	}

	async verifyCallback(token:string, redirect:string) {
		console.log(token,redirect)
	}
}