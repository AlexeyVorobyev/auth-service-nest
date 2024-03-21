import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'
import { IdInput } from '@modules/graphql/input/id.input'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { ExternalRoleService } from '@modules/external-role/external-role.service'
import { ExternalRoleListAttributes } from '@modules/external-role/attributes/external-role-list.attributes'
import { ExternalRoleListInput } from '@modules/external-role/input/external-role-list.input'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'
import { OperationMetaInterceptor } from '@modules/graphql/interceptor/operation-meta.interceptor'

@ObjectType('TExternalRoleQueries')
export class ExternalRoleQueries {
}

@UseInterceptors(OperationMetaInterceptor)
@Resolver(() => ExternalRoleQueries)
export class ExternalRoleQueryResolver {
    constructor(
        @Inject(ExternalRoleService)
        private externalRoleService: ExternalRoleService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => ExternalRoleListAttributes, {
        name: 'list',
        description: 'Provides functionality of getting list of users.',
    })
    async list(
        @Args('input', { nullable: true }) input: ExternalRoleListInput,
    ) {
        return await this.externalRoleService.getAll(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => ExternalRoleAttributes, {
        name: 'record',
        description: 'Provides functionality of getting information about user by id.',
    })
    async record(@Args('idInput') idInput: IdInput) {
        return await this.externalRoleService.getOne(idInput.id)
    }
}