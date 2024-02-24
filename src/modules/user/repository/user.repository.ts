import { UserEntity } from '../entity/user.entity'
import { FindOptionsWhere } from 'typeorm'
import { Builder } from 'builder-pattern'
import { EPostgreSQLErrorCode } from '@modules/common/enum/EPostgreSQLErrorCode'
import { UniversalError } from '@modules/common/class/universal-error'
import { EUniversalExceptionType } from '@modules/common/enum/exceptions'
import {
    AbstractTypeormRepositoryFactory,
    Constructor,
} from '@modules/common/factory/abstract-typeorm-repository.factory'

export class UserRepository extends AbstractTypeormRepositoryFactory<UserEntity>(UserEntity as Constructor<UserEntity>) {
    /**
     * Workaround for updating entities with many-to-many relation via typeorm.repository.save method
     * */
    async update(filter: FindOptionsWhere<UserEntity>, entity: Partial<UserEntity>): Promise<void> {
        const userInstance = await super.getOne(filter)
        try {
            await this.typeormRepository.save(
                Builder<UserEntity>()
                    .id(userInstance.id)
                    .createdAt(userInstance.createdAt)
                    .updatedAt(userInstance.updatedAt)
                    .verified(entity?.verified || userInstance?.verified)
                    .password(entity?.password || userInstance.password)
                    .email(entity?.email || userInstance.email)
                    .roles(entity?.roles || userInstance.roles)
                    .build(),
            )
        } catch (error) {
            if (error.code === EPostgreSQLErrorCode.uniqueViolation) {
                Builder<UniversalError>()
                    .messages([
                        `Entity with provided fields already exist`,
                        error?.detail,
                    ])
                    .exceptionBaseClass(EUniversalExceptionType.conflict)
                    .build().throw()
            } else {
                Builder<UniversalError>()
                    .messages([
                        `Internal server error`,
                        error?.message,
                    ])
                    .exceptionBaseClass(EUniversalExceptionType.server)
                    .build().throw()
            }
        }
    }
}

