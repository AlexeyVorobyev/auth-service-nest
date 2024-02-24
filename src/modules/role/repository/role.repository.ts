import { Injectable } from '@nestjs/common'
import { RoleEntity } from '../entity/role.entity'
import {
    AbstractTypeormRepositoryFactory,
    Constructor,
} from '@modules/common/factory/abstract-typeorm-repository.factory'

@Injectable()
export class RoleRepository extends AbstractTypeormRepositoryFactory<RoleEntity>(RoleEntity as Constructor<RoleEntity>) {
}