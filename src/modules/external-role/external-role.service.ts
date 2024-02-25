import { Inject, Injectable } from '@nestjs/common'
import { ExternalRoleRepository } from '@modules/external-role/repository/external-role.repository'

@Injectable()
export class ExternalRoleService {
	constructor(
		@Inject(ExternalRoleRepository)
		private readonly externalRoleRepository: ExternalRoleRepository
	) {
	}

	// getAll() {
	// 	return this.roleRepository.getAll()
	// }
}