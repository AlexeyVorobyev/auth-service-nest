import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Builder } from 'builder-pattern'
import { EUniversalExceptionType } from '@modules/common/enum/exceptions'
import { UniversalError } from '@modules/common/class/universal-error'
import { REQUEST_USER_KEY } from '@modules/common/constant'
import { JwtService } from '@modules/jwt/jwt.service'
import { EJwtStrategy } from '@modules/jwt/enum/jwt-strategy.enum'

@Injectable()
export class JwtRestAuthGuard implements CanActivate {
	constructor(
		@Inject(JwtService)
		private readonly jwtAlexService: JwtService,
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
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