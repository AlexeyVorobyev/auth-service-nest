import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { REQUEST_ROLES_KEY, REQUEST_USER_KEY } from '../../common/constants'
import { ERole } from '../../common/enums/role.enum'
import { ActiveUserData } from '../../common/interfaces/active-user-data.interface'
import { Repository } from 'typeorm'
import { UserEntity } from '../../user/entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from '../../user/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly userService: UserService
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(REQUEST_ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (!requiredRoles) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const userRequestData: ActiveUserData | undefined = request[REQUEST_USER_KEY]
		const userInstance = await this.userService.findById(userRequestData.id)

		if (!userInstance) {
			throw new BadRequestException('User not found')
		}

		return requiredRoles.some((role) => {
			return userInstance.roles?.map((roleEntity) => roleEntity.name).includes(role)
		})
	}
}