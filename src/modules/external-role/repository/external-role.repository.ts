import {
    AbstractTypeormRepositoryFactory,
    Constructor,
} from '@modules/common/factory/abstract-typeorm-repository.factory'
import { ExternalRoleEntity } from '@modules/external-role/entity/external-role.entity'

export class ExternalRoleRepository extends AbstractTypeormRepositoryFactory<ExternalRoleEntity>(ExternalRoleEntity as Constructor<ExternalRoleEntity>) {
}