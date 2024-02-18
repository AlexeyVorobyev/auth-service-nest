import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Builder } from 'builder-pattern'
import {EUniversalExceptionType} from '@modules/common/enum/exceptions'
import {UniversalError} from '@modules/common/class/universal-error'
import {IS_PUBLIC_KEY, REQUEST_USER_KEY} from '@modules/common/constant'
import {JwtAlexService} from '@modules/jwt/jwt-alex.service'
import {EJwtStrategy} from '@modules/common/enum/jwt-strategy.enum'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		@Inject(JwtAlexService)
		private readonly jwtAlexService: JwtAlexService,
		@Inject(Reflector)
		private readonly reflector: Reflector
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

		request[REQUEST_USER_KEY] = await this.jwtAlexService.verifyToken(token, EJwtStrategy.access)

		return true
	}

	private getToken(request: Request) {
		const [_, token] = request.headers.authorization?.split(' ') ?? []
		return token
	}
}