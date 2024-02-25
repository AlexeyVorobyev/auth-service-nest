import { UserEntity } from '../entity/user.entity'
import { Builder } from 'builder-pattern'
import { UserAttributes } from '@modules/user/attributes/user-attributes'

export const userEntityToUserAttributesDtoAdapter = (userEntityInstance: UserEntity): UserAttributes => {
    const userAttributesDtoBuilder = Builder<UserAttributes>()
    userAttributesDtoBuilder
        .id(userEntityInstance.id)
        .email(userEntityInstance.email)
        .role(userEntityInstance.role)
        .updatedAt(new Date(userEntityInstance.updatedAt))
        .createdAt(new Date(userEntityInstance.createdAt))
        .verified(userEntityInstance.verified)
    // .externalServices(userEntityInstance.externalServices.map((externalServiceInstance) => (
    //     externalServiceEntityToExternalServiceResponseDtoAdapter(externalServiceInstance)
    // )))
    return userAttributesDtoBuilder.build()
}
