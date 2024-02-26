import {
    AbstractTypeormRepositoryFactory,
    Constructor,
} from '@modules/database/factory/abstract-typeorm-repository.factory'
import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'

export class ExternalServiceRepository extends AbstractTypeormRepositoryFactory<ExternalServiceEntity>(ExternalServiceEntity as Constructor<ExternalServiceEntity>) {
}