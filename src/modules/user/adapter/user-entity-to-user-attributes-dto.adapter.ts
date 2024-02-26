import { UserEntity } from '../entity/user.entity'
import { Builder } from 'builder-pattern'
import { UserAttributes } from '@modules/user/attributes/user-attributes'
import {
    externalServiceEntityToExternalServiceAttributesAdapter
} from '@modules/external-service/adapter/external-service-entity-to-external-service-attributes.adapter'

export const userEntityToUserAttributesDtoAdapter = (userEntityInstance: UserEntity): UserAttributes => {
    const userAttributesDtoBuilder = Builder<UserAttributes>()
    userAttributesDtoBuilder
        .id(userEntityInstance.id)
        .email(userEntityInstance.email)
        .role(userEntityInstance.role)
        .updatedAt(new Date(userEntityInstance.updatedAt))
        .createdAt(new Date(userEntityInstance.createdAt))
        .verified(userEntityInstance.verified)
        .externalServices(
            userEntityInstance.externalServices
                .map(item => externalServiceEntityToExternalServiceAttributesAdapter(item))
        )
    return userAttributesDtoBuilder.build()
}
