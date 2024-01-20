import { SetMetadata } from '@nestjs/common'
import { REQUEST_ROLES_KEY } from '../constants'
import { ERole } from '../enums/role.enum'

export const Roles = (...roles: ERole[]): void => {
	SetMetadata(REQUEST_ROLES_KEY, roles)
}