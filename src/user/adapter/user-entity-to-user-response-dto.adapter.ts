import { UserResponseDto } from '../dto/user-response.dto'
import { UserEntity } from '../entity/user.entity'
import { Builder } from 'builder-pattern'
import { RoleEntity } from '../../role/entity/role.entity'

export const userEntityToUserResponseDtoAdapter = (userEntityInstance: UserEntity): UserResponseDto => {
	const userResponseDtoBuilder = Builder(UserResponseDto)
	userResponseDtoBuilder
		.id(userEntityInstance.id)
		.email(userEntityInstance.email)
		.roles(userEntityInstance.roles.map((roleEntityInstance: RoleEntity) => roleEntityInstance.name))
		.updatedAt(userEntityInstance.updatedAt)
		.createdAt(userEntityInstance.createdAt)
	return userResponseDtoBuilder.build()
}
