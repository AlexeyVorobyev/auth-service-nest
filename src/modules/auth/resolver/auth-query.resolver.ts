import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { AuthService } from '@modules/auth/auth.serivce'
import { TokenDataAttributes } from '@modules/auth/attributes/token-data.attributes'
import { SignInInput } from '@modules/auth/input/sign-in.input'
import { RefreshInput } from '@modules/auth/input/refresh.input'
import { ActiveUser } from '@modules/common/decorator/active-user.decorator'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'

@ObjectType('TAuthQueries')
export class AuthQueries {
}

@Resolver(() => AuthQueries)
export class AuthQueryResolver {
    constructor(
        @Inject(AuthService)
        private authService: AuthService,
    ) {
    }

    @ResolveField(() => TokenDataAttributes, {
        name: 'signIn',
        description: 'Provides functionality of sign in to system.',
    })
    async signIn(@Args('input') input: SignInInput): Promise<TokenDataAttributes> {
        return this.authService.signIn(input)
    }

    @UseGuards(JwtGraphQLAuthGuard)
    @ResolveField(() => TokenDataAttributes, {
        name: 'refresh',
        description: 'Provides functionality of sign up to system.',
    })
    async refresh(
        @ActiveUser('id') userId: string,
        @Args('input') input: RefreshInput): Promise<TokenDataAttributes> {
        return this.authService.refresh(input.token, userId)
    }
}