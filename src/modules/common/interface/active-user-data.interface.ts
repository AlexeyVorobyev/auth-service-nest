import { ERole } from '../enum/role.enum'

export interface IActiveUserData {
	id: string
	email: string
	role: ERole
	tokenId: string
}