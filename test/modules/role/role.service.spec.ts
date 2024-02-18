import { Test, TestingModule } from '@nestjs/testing'
import { RoleService } from '@modules/role/role.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoleEntity } from '@modules/role/entity/role.entity'
import { Repository } from 'typeorm'


describe('roleService', () => {
    let service: RoleService
    let roleRepository: Repository<RoleEntity>

    const token = getRepositoryToken(RoleEntity)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: token,
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn()
                    }
                }
            ],
        }).compile()

        service = module.get<RoleService>(RoleService)
        roleRepository = module.get<Repository<RoleEntity>>(token)
    })

    it('should-return-base-roles', async () => {
        console.log(await roleRepository.find())
    })
})