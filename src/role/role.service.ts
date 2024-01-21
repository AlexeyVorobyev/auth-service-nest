import { Inject, Injectable } from '@nestjs/common'
import { ERole } from '../common/enum/role.enum'
import { RoleRepository } from './repository/role.repository'

@Injectable()
export class RoleService {

	constructor(
		@Inject(RoleRepository)
		private readonly roleRepository: RoleRepository
	) {
	}

}