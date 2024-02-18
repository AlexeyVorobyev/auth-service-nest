import { Inject } from '@nestjs/common'
import { Command, CommandRunner } from 'nest-commander'
import { ERole } from '../common/enum/role.enum'
import { Builder } from 'builder-pattern'
import { RoleEntity } from '../role/entity/role.entity'
import { RoleRepository } from '../role/repository/role.repository'

@Command({
	name: 'base-roles-init',
	description: 'Initialize base roles in system'
})
export class BaseRolesInitCommand extends CommandRunner {
	private rolesList: string[]

	constructor(
		@Inject(RoleRepository)
		private readonly roleRepository: RoleRepository
	) {
		super()
		this.rolesList = Object.values(ERole)
	}

	async run(): Promise<void> {
		this.rolesList.forEach((role: ERole) => {
			if (this.roleRepository.getOne({ name: role })) {
				return
			}

			const RoleEntityBuilder = Builder(RoleEntity)
			RoleEntityBuilder
				.name(role)
			this.roleRepository.saveOne(RoleEntityBuilder.build())
		})
	}
}