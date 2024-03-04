import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { AuthService } from '@modules/auth/auth.serivce'
import { SignUpInput } from '@modules/auth/input/sign-up.input'
import { TokenDataAttributes } from '@modules/auth/attributes/token-data.attributes'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { ActiveUser } from '@modules/common/decorator/active-user.decorator'
import { IdInput } from '@modules/graphql/input/id.input'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'

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

    @UseGuards(JwtGraphQLAuthGuard)
    @ResolveField(() => Boolean, {
        name: 'sendConfirmationEmailMe',
        description: 'sends email to you to verify',
    })
    async sendConfirmationMailMe(@ActiveUser('id') userId: string) {
        await this.authService.sendConfirmationMail(userId)
        return true
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => Boolean, {
        name: 'sendConfirmationEmail',
        description: 'sends email to user to make account verified',
    })
    async sendConfirmationMail(@Args('input') input: IdInput) {
        await this.authService.sendConfirmationMail(input.id)
        return true
    }
}
