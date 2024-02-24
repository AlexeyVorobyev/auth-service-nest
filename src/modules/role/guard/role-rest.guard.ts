import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FORBIDDEN_ERROR_MESSAGE, REQUEST_ROLES_KEY, REQUEST_USER_KEY } from '../../common/constant'
import { ERole } from '../../common/enum/role.enum'
import { IActiveUserData } from '../../common/interface/active-user-data.interface'
import { Builder } from 'builder-pattern'
import { UniversalError } from '../../common/class/universal-error'
import { EUniversalExceptionType } from '../../common/enum/exceptions'

@Injectable()
export class RoleRestGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(REQUEST_ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (!requiredRoles) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const userRequestData: IActiveUserData | undefined = request[REQUEST_USER_KEY]

		const result = requiredRoles.some((role) => {
			return userRequestData.roles?.includes(role)
		})

		if (!result) {
			Builder(UniversalError)
				.messages([FORBIDDEN_ERROR_MESSAGE])
				.exceptionBaseClass(EUniversalExceptionType.forbidden)
				.build().throw()
		}

		return true
	}
}