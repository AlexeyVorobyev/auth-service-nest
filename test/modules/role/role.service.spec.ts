import { Test, TestingModule } from '@nestjs/testing'
import { ExternalRoleService } from '@modules/external-role/external-role.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoleEntity } from '@modules/external-role/entity/role.entity'
import { Repository } from 'typeorm'


describe('roleService', () => {
    let service: ExternalRoleService
    let roleRepository: Repository<RoleEntity>

    const token = getRepositoryToken(RoleEntity)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExternalRoleService,
                {
                    provide: token,
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn()
                    }
                }
            ],
        }).compile()

        service = module.get<ExternalRoleService>(ExternalRoleService)
        roleRepository = module.get<Repository<RoleEntity>>(token)
    })

    it('should-return-base-roles', async () => {
        console.log(await roleRepository.find())
    })
})