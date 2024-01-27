import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import jwtConfig from '../common/config/jwt.config'
import { IActiveUserData } from '../common/interface/active-user-data.interface'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { UserEntity } from '../user/entity/user.entity'
import { SignInResponseDto } from './dto/sign-in-response.dto'
import { Builder } from 'builder-pattern'
import { RefreshDto } from './dto/refresh.dto'
import { RefreshResponseDto } from './dto/refresh-response.dto'
import { EPostgreSQLErrorCode } from '../common/enum/EPostgreSQLErrorCode'
import { RoleEntity } from '../role/entity/role.entity'
import { DEFAULT_ROLE } from '../common/constant'
import { UniversalError } from '../common/class/universal-error'
import { EUniversalExceptionType } from '../common/enum/exceptions'
import { UserService } from '../user/user.service'
import { UserCreateDto } from '../user/dto/user-create.dto'
import { UserRepository } from '../user/repository/user.repository'

@Injectable()
export class AuthService {
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		@Inject(BcryptService)
		private readonly bcryptService: BcryptService,
		@Inject('JwtAccessService')
		private readonly jwtAccessService: JwtService,
		@Inject('JwtRefreshService')
		private readonly jwtRefreshService: JwtService,
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(UserRepository)
		private readonly userRepository: UserRepository
	) {
	}

	async signUp(signUpDto: SignUpDto): Promise<void> {
		const userCreateDtoBuilder = Builder(UserCreateDto)
		userCreateDtoBuilder
			.email(signUpDto.email)
			.password(signUpDto.password)
			.roles([DEFAULT_ROLE])
			.verified(false)
		await this.userService.create(userCreateDtoBuilder.build())
	}

	async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
		const { email, password } = signInDto

		const user = await this.userRepository.getOne({ email: email })
		if (!user) {
			Builder(UniversalError)
				.messages(['Invalid email'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const isPasswordMatch = await this.bcryptService.compare(
			password,
			user.password
		)
		if (!isPasswordMatch) {
			Builder(UniversalError)
				.messages(['Invalid password'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const SignInResponseBuilder = Builder(SignInResponseDto)
		SignInResponseBuilder
			.accessToken(await this.generateAccessToken(user))
			.accessTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.accessTokenTtl))
			.refreshToken(await this.generateRefreshToken(user))
			.refreshTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.refreshTokenTtl))
		return SignInResponseBuilder.build()
	}

	async refresh(refreshDto: RefreshDto, userId: string): Promise<RefreshResponseDto> {
		try {
			await this.jwtRefreshService.verifyAsync<IActiveUserData>(
				refreshDto.refreshToken,
				{
					secret: this.jwtConfiguration.refreshSecret
				}
			)
		} catch (error) {
			Builder(UniversalError)
				.messages([error.message])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const user = await this.userRepository.getOne({ id: userId })
		if (!user) {
			Builder(UniversalError)
				.messages(['Invalid userId'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}

		const RefreshResponseBuilder = Builder(RefreshResponseDto)
		RefreshResponseBuilder
			.accessToken(await this.generateAccessToken(user))
			.accessTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.accessTokenTtl))
			.refreshToken(await this.generateRefreshToken(user))
			.refreshTokenTTL(new Date(new Date().valueOf() + this.jwtConfiguration.refreshTokenTtl))
		return RefreshResponseBuilder.build()
	}

	async generateRefreshToken(
		user: Partial<UserEntity>
	): Promise<string> {
		const tokenId = randomUUID()

		return await this.jwtRefreshService.signAsync(
			{
				id: user.id,
				email: user.email,
				tokenId: tokenId,
				roles: user.roles.map((roleEntity: RoleEntity) => roleEntity.name)
			} as IActiveUserData
		)
	}

	async generateAccessToken(
		user: Partial<UserEntity>
	): Promise<string> {
		const tokenId = randomUUID()

		return await this.jwtAccessService.signAsync(
			{
				id: user.id,
				email: user.email,
				tokenId: tokenId,
				roles: user.roles.map((roleEntity: RoleEntity) => roleEntity.name)
			} as IActiveUserData
		)
	}
}