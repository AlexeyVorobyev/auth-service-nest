import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from './entity/user.entity'
import { UniversalError } from '../common/class/universal-error'
import { EUniversalExceptionType } from '../common/enum/exceptions'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { ERole } from '../common/enum/role.enum'
import { FORBIDDEN_ERROR_MESSAGE } from '../common/constant'
import { UserRepository } from './repository/user.repository'
import { FindOptionsWhere, In, Like } from 'typeorm'
import { sortDtoListFindOptionsOrderAdapter } from '../common/adapter/sort-dto-list-find-options-order.adapter'
import { RoleRepository } from '../role/repository/role.repository'
import { UserUpdatePayloadInput } from '@modules/user/input/user-update-payload.input'
import { Builder } from 'builder-pattern'
import {
    getAllPayloadDtoToFindOptionsWhereAdapter,
} from '@modules/common/adapter/get-all-payload-dto-to-find-options-where.adapter'
import { userEntityToUserAttributesDtoAdapter } from '@modules/user/adapter/user-entity-to-user-attributes-dto.adapter'
import { UserListInput } from '@modules/user/input/user-list.input'
import { UserListAttributes } from '@modules/user/attributes/user-list.attributes'
import { UserAttributes } from '@modules/user/attributes/user-attributes'
import { ListMetaAttributes } from '@modules/graphql/attributes/list-meta.attributes'
import { UserCreateInput } from '@modules/user/input/user-create.input'
import { UserUpdateMeInput } from '@modules/user/input/user-update-me.input'


@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        @Inject(BcryptService)
        private readonly bcryptService: BcryptService,
        @Inject(RoleRepository)
        private readonly roleRepository: RoleRepository,
    ) {
    }

    async getAll(input: UserListInput): Promise<UserListAttributes> {
        const filter: FindOptionsWhere<UserEntity> = {
            ...getAllPayloadDtoToFindOptionsWhereAdapter(input),
            email: input.simpleFilter ? Like(`%${input.simpleFilter}%`) : undefined,
            roles: {
                name: input.roleFilter,
            },
            externalServices: {
                id: input.externalServiceFilter ? In(input.externalServiceFilter) : undefined,
            },
        }

        const userEntityInstances = await this.userRepository.getAll(
            filter,
            sortDtoListFindOptionsOrderAdapter<UserEntity>(
                input.sort,
                Builder<UserEntity>()
                    .id(null).email(null).password(null)
                    .createdAt(null).updatedAt(null)
                    .verified(null)
                    .build(),
            ),
            input.page,
            input.perPage,
            { roles: true },
        )

        const totalElements = await this.userRepository.count(filter)

        const userListAttributesBuilder = Builder<UserListAttributes>()
        userListAttributesBuilder
            .data(
                userEntityInstances
                    .map((userEntityInstance: UserEntity) => userEntityToUserAttributesDtoAdapter(userEntityInstance)),
            )
            .meta(
                Builder<ListMetaAttributes>()
                    .currentPage(input.page)
                    .elementsPerPage(input.perPage)
                    .totalElements(totalElements)
                    .totalPages(Math.ceil(totalElements / input.perPage))
                    .build(),
            )
        return userListAttributesBuilder.build()
    }

    async getOne(id: string): Promise<UserAttributes> {
        const user = await this.userRepository.getOne({ id: id })
        return userEntityToUserAttributesDtoAdapter(user)
    }

    async create(
        input: UserCreateInput,
        userRoles?: ERole[],
    ): Promise<UserAttributes> {
        if (userRoles) {
            const activeUserHighRole = userRoles.includes(ERole.Admin) ? ERole.Admin : ERole.Moderator
            const allowedRolesAssertion = activeUserHighRole === ERole.Admin ? [ERole.User, ERole.Moderator] : [ERole.User]
            input.roles.forEach((role: ERole) => {
                if (!allowedRolesAssertion.includes(role)) {
                    Builder(UniversalError)
                        .messages([
                            FORBIDDEN_ERROR_MESSAGE,
                            `You cant create user with ${role} role`,
                        ])
                        .exceptionBaseClass(EUniversalExceptionType.forbidden)
                        .build().throw()
                }
            })
        }
        const roleInstances = await Promise.all(
            input.roles.map((role: ERole) => {
                return this.roleRepository.getOne({ name: role })
            }),
        )

        const userBuilder = Builder<UserEntity>()
        userBuilder
            .email(input.email)
            .password(await this.bcryptService.hash(input.password))
            .roles(roleInstances).verified(input.verified)
        const createdUserEntityInstance = await this.userRepository.saveOne(userBuilder.build())

        return userEntityToUserAttributesDtoAdapter(createdUserEntityInstance)
    }

    async update(
        id: string,
        input: UserUpdatePayloadInput,
        userRoles: ERole[],
    ): Promise<UserAttributes> {
        const userToUpdate = await this.userRepository.getOne({ id: id })
        const activeUserHighRole = userRoles.includes(ERole.Admin) ? ERole.Admin : ERole.Moderator

        if (activeUserHighRole === ERole.Admin) {
            if (userToUpdate.roles.map((role) => role.name).includes(ERole.Admin)) {
                Builder(UniversalError)
                    .messages([
                        FORBIDDEN_ERROR_MESSAGE,
                        'You cant update other admins',
                    ])
                    .exceptionBaseClass(EUniversalExceptionType.forbidden)
                    .build().throw()
            }
        }
        if (activeUserHighRole === ERole.Moderator) {
            if (
                userToUpdate.roles.map((role) => role.name).includes(ERole.Admin)
                || userToUpdate.roles.map((role) => role.name).includes(ERole.Moderator)
            ) {
                Builder(UniversalError)
                    .messages([
                        FORBIDDEN_ERROR_MESSAGE,
                        'You cant update other admins or moderators',
                    ])
                    .exceptionBaseClass(EUniversalExceptionType.forbidden)
                    .build().throw()
            }
        }

        const allowedRolesAssertion = activeUserHighRole === ERole.Admin ? [ERole.User, ERole.Moderator] : [ERole.User]
        userToUpdate.roles.forEach((role) => {
            if (!allowedRolesAssertion.includes(role.name)) {
                Builder(UniversalError)
                    .messages([
                        FORBIDDEN_ERROR_MESSAGE,
                        `You cant assign to user ${role.name} role`,
                    ])
                    .exceptionBaseClass(EUniversalExceptionType.forbidden)
                    .build().throw()
            }
        })
        const roleInstances = input.roles ? await Promise.all(
            input.roles.map((role: ERole) => {
                return this.roleRepository.getOne({ name: role })
            }),
        ) : undefined

        await this.userRepository.update(
            { id: id },
            Builder<UserEntity>()
                .email(input?.email || undefined)
                .password(input?.password ? await this.bcryptService.hash(input.password) : undefined)
                .roles(roleInstances).verified(input?.verified || undefined)
                .build(),
        )

        return await this.getOne(id)
    }

    async delete(id: string) {
        const userToDelete = await this.userRepository.getOne({ id: id })
        if (userToDelete.roles.map((role) => role.name).includes(ERole.Admin)) {
            Builder(UniversalError)
                .messages([
                    FORBIDDEN_ERROR_MESSAGE,
                    'You cant delete other admins',
                ])
                .exceptionBaseClass(EUniversalExceptionType.forbidden)
                .build().throw()
        } else {
            await this.userRepository.delete({ id: id })
            return id
        }
    }

    async updateMe(id: string, input: UserUpdateMeInput): Promise<UserAttributes> {
        await this.userRepository.update(
            { id: id },
            Builder<UserEntity>()
                .email(input?.email || undefined)
                .password(input?.password ? await this.bcryptService.hash(input.password) : undefined)
                .build(),
        )

        return await this.getOne(id)
    }
}