import { UserResponseDto } from '../dto/user-response.dto'
import { UserEntity } from '../entity/user.entity'
import { Builder } from 'builder-pattern'
import { RoleEntity } from '@modules/role/entity/role.entity'
import {
    externalServiceEntityToExternalServiceResponseDtoAdapter,
} from '@modules/external-service/adapter/external-service-entity-to-external-service-response-dto.adapter'

export const userEntityToUserResponseDtoAdapter = (userEntityInstance: UserEntity): UserResponseDto => {
    const userResponseDtoBuilder = Builder<UserResponseDto>()
    userResponseDtoBuilder
        .id(userEntityInstance.id)
        .email(userEntityInstance.email)
        .roles(userEntityInstance.roles.map((roleEntityInstance: RoleEntity) => roleEntityInstance.name))
        .updatedAt(userEntityInstance.updatedAt)
        .createdAt(userEntityInstance.createdAt)
        .verified(userEntityInstance.verified)
        .externalServices(userEntityInstance.externalServices.map((externalServiceInstance) => (
            externalServiceEntityToExternalServiceResponseDtoAdapter(externalServiceInstance)
        )))
    return userResponseDtoBuilder.build()
}
