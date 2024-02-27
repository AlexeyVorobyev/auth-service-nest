import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { AuthService } from '@modules/auth/auth.serivce'
import { SignUpInput } from '@modules/auth/input/sign-up.input'
import { TokenDataAttributes } from '@modules/auth/attributes/token-data.attributes'

@ObjectType('TAuthMutations')
export class AuthMutations {
}

@Resolver(() => AuthMutations)
export class AuthMutationResolver {
    constructor(
        @Inject(AuthService)
        private authService: AuthService,
    ) {
    }

    @ResolveField(() => TokenDataAttributes, {
        name: 'signUp',
        description: 'Provides functionality of sign up to system.',
    })
    async signUp(@Args('input') input: SignUpInput): Promise<TokenDataAttributes> {
        return this.authService.signUp(input)
    }
}
