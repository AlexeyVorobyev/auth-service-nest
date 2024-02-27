import { Args, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserAttributes } from '@modules/user/attributes/user-attributes'
import { UserService } from '@modules/user/user.service'
import { Inject, UseGuards } from '@nestjs/common'
import { UserListAttributes } from '@modules/user/attributes/user-list.attributes'
import { UserListInput } from '@modules/user/input/user-list.input'
import { IdInput } from '@modules/graphql/input/id.input'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { ActiveGraphQLUser } from '@modules/common/decorator/active-grahql-user-decorator'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'

@ObjectType('TUserQueries')
export class UserQueries {
}

@Resolver(() => UserQueries)
export class UserQueryResolver {
    constructor(
        @Inject(UserService)
        private userService: UserService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => UserListAttributes, {
        name: 'list',
        description: 'Provides functionality of getting list of users.',
    })
    async list(
        @Args('input', { nullable: true }) input: UserListInput,
    ) {
        return await this.userService.getAll(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => UserAttributes, {
        name: 'record',
        description: 'Provides functionality of getting information about user by id.',
    })
    async record(@Args('idInput') idInput: IdInput) {
        return await this.userService.getOne(idInput.id)
    }

    @UseGuards(JwtGraphQLAuthGuard)
    @ResolveField(() => UserAttributes, {
        name: 'recordMe',
        description: 'Provides user information.',
    })
    async recordMe(@ActiveGraphQLUser('id') userId: string) {
        return this.userService.getOne(userId)
    }
}