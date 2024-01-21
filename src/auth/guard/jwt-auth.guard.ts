import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import jwtConfig from '../../common/config/jwt.config'
import { IActiveUserData } from '../../common/interface/active-user-data.interface'
import { IS_PUBLIC_KEY, REQUEST_USER_KEY } from '../../common/constant'
import { Builder } from 'builder-pattern'
import { UniversalError } from '../../common/class/universal-error'
import { EUniversalExceptionType } from '../../common/enum/exceptions'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		@Inject('JwtAccessService')
		private readonly jwtAccessService: JwtService,
		private reflector: Reflector
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (isPublic) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const token = this.getToken(request)
		if (!token) {
			Builder(UniversalError)
				.messages(['Authorization token is required'])
				.exceptionBaseClass(EUniversalExceptionType.unauthorized)
				.build().throw()
		}

		try {
			request[REQUEST_USER_KEY] = await this.jwtAccessService.verifyAsync<IActiveUserData>(
				token,
				{
					secret: this.jwtConfiguration.accessSecret
				}
			)
		} catch (error) {
			Builder(UniversalError)
				.messages([error.message])
				.exceptionBaseClass(EUniversalExceptionType.unauthorized)
				.build().throw()
		}

		return true
	}

	private getToken(request: Request) {
		const [_, token] = request.headers.authorization?.split(' ') ?? []
		return token
	}
}