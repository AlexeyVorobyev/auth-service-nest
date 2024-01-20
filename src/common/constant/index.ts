import { ERole } from '../enum/role.enum'

export const REQUEST_USER_KEY = 'user'
export const REQUEST_ROLES_KEY = 'roles'
export const DEFAULT_ROLE = ERole.User
export const FORBIDDEN_ERROR_MESSAGE = 'Your role doesnt provide permission to this action'