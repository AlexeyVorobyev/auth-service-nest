import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { UserAttributes } from '@modules/user/attributes/user-attributes'
import { UserService } from '@modules/user/user.service'
import { Inject, UseGuards } from '@nestjs/common'
import { IdInput } from '@modules/graphql/input/id.input'
import { UserCreateInput } from '@modules/user/input/user-create.input'
import { UserUpdateInput } from '@modules/user/input/user-update.input'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { ActiveGraphQLUser } from '@modules/common/decorator/active-grahql-user-decorator'
import { UserUpdateMeInput } from '@modules/user/input/user-update-me.input'


@ObjectType('TUserMutations')
export class UserMutations {
}

@Resolver(() => UserMutations)
export class UserMutationResolver {
    constructor(
        @Inject(UserService)
        private userService: UserService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => UserAttributes, {
        name: 'create',
        description: 'Provides functionality of creating users evading sign-up system.',
    })
    async create(
        @Args('input') input: UserCreateInput,
    ) {
        return await this.userService.create(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => UserAttributes, {
        name: 'update',
        description: 'Provides functionality of editing user by id.',
    })
    async update(
        @ActiveGraphQLUser('role') role: ERole,
        @Args('input') input: UserUpdateInput,
    ) {
        return await this.userService.update(input.id, input.payload, role)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => String, {
        name: 'delete',
        description: 'Provides functionality of deleting user by id.',
    })
    async delete(
        @ActiveGraphQLUser('role') role: ERole,
        @Args('input') input: IdInput,
    ) {
        return await this.userService.delete(input.id, role)
    }

    @UseGuards(JwtGraphQLAuthGuard)
    @ResolveField(() => UserAttributes, {
        name: 'updateMe',
        description: 'Provides functionality of updating yourself',
    })
    async updateMe(
        @ActiveGraphQLUser('id') userId: string,
        @Args('input') input: UserUpdateMeInput,
    ) {
        return await this.userService.updateMe(userId, input)
    }

    @UseGuards(JwtGraphQLAuthGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => String, {
        name: 'deleteMe',
        description: 'Provides functionality of deleting yourself',
    })
    async deleteMe(
        @ActiveGraphQLUser('id') userId: string,
    ) {
        return await this.userService.deleteMe(userId)
    }
}