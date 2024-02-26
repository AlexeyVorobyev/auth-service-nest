import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import jwtConfig from '../config/config/jwt.config'
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
import { UserRepository } from '../user/repository/user.repository'
import { EmailService } from '@modules/email/email.service'
import { JwtService } from '@modules/jwt/jwt.service'
import { EJwtStrategy } from '@modules/jwt/enum/jwt-strategy.enum'
import { UserEntity } from '@modules/user/entity/user.entity'
import { UserCreateInput } from '@modules/user/input/user-create.input'

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
        @Inject(JwtService)
        private readonly jwtAlexService: JwtService,
    ) {
    }

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const userCreateInput = Builder<UserCreateInput>()
        userCreateInput
            .email(signUpDto.email)
            .password(signUpDto.password)
            .role(DEFAULT_ROLE)
            .verified(false)
        const userCreateResponseDtoInstance = await this.userService.create(userCreateInput.build())

        const userEntityInstance = await this.userRepository.getOne({ id: userCreateResponseDtoInstance.id })
        await this.emailService.sendUserConfirmation(
            userEntityInstance,
            await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.verify),
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
            userEntityInstance.password,
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
        await this.jwtAlexService.verifyToken(refreshDto.refreshToken, EJwtStrategy.refresh)

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
            await this.jwtAlexService.generateToken(userEntityInstance, EJwtStrategy.verify),
        )
    }

    /**
     * Endpoint for verification user email with provided token.
     * */
    async verifyCallback(res: any, token: string, redirectSuccess: string, redirectFailure: string) {
        console.log(token, redirectSuccess, redirectFailure)
        try {
            const userData = await this.jwtAlexService.verifyToken(token, EJwtStrategy.verify)

            await this.userRepository.update(
                { id: userData.id },
                Builder<UserEntity>()
                    .verified(true)
                    .build(),
            )

            const redirectUrl = new URL(redirectSuccess)
            Array.from(Object.keys(userData)).forEach((key) => {
                redirectUrl.searchParams.append(key, userData[key])
            })
            res.redirect(redirectUrl)
        } catch (e) {
            res.redirect(new URL(redirectFailure))
        }
    }
}