import { UserEntity } from '../entity/user.entity'
import { Builder } from 'builder-pattern'
import { RoleEntity } from '@modules/role/entity/role.entity'
import { UserAttributes } from '@modules/user/attributes/user-attributes'

export const userEntityToUserAttributesDtoAdapter = (userEntityInstance: UserEntity): UserAttributes => {
    const userAttributesDtoBuilder = Builder<UserAttributes>()
    userAttributesDtoBuilder
        .id(userEntityInstance.id)
        .email(userEntityInstance.email)
        .roles(userEntityInstance.roles.map((roleEntityInstance: RoleEntity) => roleEntityInstance.name))
        .updatedAt(new Date(userEntityInstance.updatedAt))
        .createdAt(new Date(userEntityInstance.createdAt))
        .verified(userEntityInstance.verified)
        // .externalServices(userEntityInstance.externalServices.map((externalServiceInstance) => (
        //     externalServiceEntityToExternalServiceResponseDtoAdapter(externalServiceInstance)
        // )))
    return userAttributesDtoBuilder.build()
}
