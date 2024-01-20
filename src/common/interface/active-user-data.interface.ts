import { ERole } from '../enum/role.enum'

export interface IActiveUserData {
	id: string
	email: string
	tokenId: string
	roles: ERole[]
}