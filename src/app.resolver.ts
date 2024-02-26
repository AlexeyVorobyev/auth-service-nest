import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserQueries } from '@modules/user/resolver/user-query.resolver'
import { UserMutations } from '@modules/user/resolver/user-mutation.resolver'
import { ExternalServiceQueries } from '@modules/external-service/resolver/external-service-query.resolver'
import { ExternalServiceMutations } from '@modules/external-service/resolver/external-service-mutation.resolver'
import { UseGuards } from '@nestjs/common'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'

@Resolver('root')
export class RootResolver {
    @Query(() => UserQueries, { name: 'user' })
    userQueries() {
        return new UserQueries()
    }

    @Mutation(() => UserMutations, { name: 'user' })
    userMutations() {
        return new UserMutations()
    }

    @Query(() => ExternalServiceQueries, { name: 'externalService' })
    externalServiceQueries() {
        return new ExternalServiceQueries()
    }

    @Mutation(() => ExternalServiceMutations, { name: 'externalService' })
    externalServiceMutations() {
        return new ExternalServiceMutations()
    }
}