import { ERole } from '../../common/enum/role.enum'

export class UserCreateDto {
	email: string
	password: string
	roles: ERole[]
}