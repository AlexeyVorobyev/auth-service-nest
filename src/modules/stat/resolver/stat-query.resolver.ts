import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { UserAttributes } from '@modules/user/attributes/user.attributes'
import { UserService } from '@modules/user/user.service'
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserListAttributes } from '@modules/user/attributes/user-list.attributes'
import { UserListInput } from '@modules/user/input/user-list.input'
import { IdInput } from '@modules/graphql/input/id.input'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { ActiveGraphQLUser } from '@modules/common/decorator/active-grahql-user-decorator'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { OperationMetaInterceptor } from '@modules/graphql/interceptor/operation-meta.interceptor'
import {StatService} from '@modules/stat/stat.service'
import {StatUserRegistrationHistoryInput} from '@modules/stat/input/stat-user-registration-history.input'
import {StatValueAttributes} from '@modules/stat/attributes/stat-value.attributes'
import {UserRegistrationHistoryListAttributes} from '@modules/stat/attributes/user-registration-history-list.attributes'
import {UserTotalAmountAttributes} from '@modules/stat/attributes/user-total-amount.attributes'

@ObjectType('TStatQueries')
export class StatQueries {
}

@UseInterceptors(OperationMetaInterceptor)
@Resolver(() => StatQueries)
export class StatQueryResolver {
    constructor(
        private statService: StatService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => UserRegistrationHistoryListAttributes, {
        name: 'userRegistrationHistoryList',
        description: 'Provides functionality of getting stat of users registration',
    })
    async userRegistrationHistoryList(
        @Args('input') input: StatUserRegistrationHistoryInput,
    ) {
        return await this.statService.userRegistrationHistoryList(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => UserTotalAmountAttributes, {
        name: 'userTotalAmount',
        description: 'Provides functionality of getting stat of users registration',
    })
    async userTotalAmount() {
        return await this.statService.userTotalAmount()
    }
}