import { Inject, Injectable } from '@nestjs/common'
import { RoleRepository } from './repository/role.repository'

@Injectable()
export class RoleService {

	constructor(
		@Inject(RoleRepository)
		private readonly roleRepository: RoleRepository
	) {
	}

}