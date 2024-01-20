import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import jwtConfig from '../../common/config/jwt.config'
import { IActiveUserData } from '../../common/interface/active-user-data.interface'
import { REQUEST_USER_KEY } from '../../common/constant'
import { Builder } from 'builder-pattern'
import { UniversalError } from '../../common/class/universal-error'
import { EExceptions } from '../../common/enum/exceptions'

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
		const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
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
				.exceptionBaseClass(EExceptions.unauthorized)
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
				.exceptionBaseClass(EExceptions.unauthorized)
				.build().throw()
		}

		return true
	}

	private getToken(request: Request) {
		const [_, token] = request.headers.authorization?.split(' ') ?? []
		return token
	}
}