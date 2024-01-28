import { ERole } from '../enum/role.enum'

export interface IActiveUserData {
	id: string
	email: string
	roles: ERole[]
	tokenId: string
}