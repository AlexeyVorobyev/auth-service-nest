import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { UserQueries } from '@modules/user/resolver/user-query.resolver'
import { UserMutations } from '@modules/user/resolver/user-mutation.resolver'

@Resolver('root')
export class RootResolver {
    @Query((returns) => UserQueries, { name: 'user' })
    userQueries() {
        return new UserQueries()
    }

    @Mutation((returns) => UserMutations, { name: 'user' })
    userMutations() {
        return new UserMutations()
    }
}