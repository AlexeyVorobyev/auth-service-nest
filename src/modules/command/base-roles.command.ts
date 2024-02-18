import { Inject } from '@nestjs/common'
import { Command, CommandRunner } from 'nest-commander'
import { ERole } from '../common/enum/role.enum'
import { Builder } from 'builder-pattern'
import { RoleEntity } from '../role/entity/role.entity'
import { RoleRepository } from '../role/repository/role.repository'

@Command({
    name: 'base-roles-init',
    description: 'Initialize base roles in system',
})
export class BaseRolesInitCommand extends CommandRunner {
    private rolesList: ERole[]

    constructor(
        @Inject(RoleRepository)
        private readonly roleRepository: RoleRepository,
    ) {
        super()
        this.rolesList = Object.values(ERole)
    }

    async run(): Promise<void> {
        console.log(await this.roleRepository.getAll())
        for (const role of this.rolesList) {
            try {
                await this.roleRepository.getOne({ name: role })
            }
            catch (error) {
                const RoleEntityBuilder = Builder(RoleEntity)
                RoleEntityBuilder
                    .name(role)
                await this.roleRepository.saveOne(RoleEntityBuilder.build())
            }
        }
    }
}
