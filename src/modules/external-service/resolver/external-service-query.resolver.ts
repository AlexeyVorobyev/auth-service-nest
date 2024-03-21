import { Args, Field, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { ERole } from '@modules/common/enum/role.enum'
import { ExternalServiceService } from '@modules/external-service/external-service.service'
import { ExternalServiceListInput } from '@modules/external-service/input/external-service-list.input'
import { ExternalServiceListAttributes } from '@modules/external-service/attributes/external-service-list.attributes'
import { UserAttributes } from '@modules/user/attributes/user.attributes'
import { IdInput } from '@modules/graphql/input/id.input'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'
import { OperationMetaInterceptor } from '@modules/graphql/interceptor/operation-meta.interceptor'

@ObjectType('TExternalServiceQueries')
export class ExternalServiceQueries {
    id: string
}

@UseInterceptors(OperationMetaInterceptor)
@Resolver(() => ExternalServiceQueries)
export class ExternalServiceQueryResolver {
    constructor(
        @Inject(ExternalServiceService)
        private externalServiceService: ExternalServiceService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => ExternalServiceListAttributes, {
        name: 'list',
        description: 'Provides functionality of getting list of external services.',
    })
    async list(
        @Args('input', { nullable: true }) input: ExternalServiceListInput,
    ) {
        return await this.externalServiceService.getAll(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => ExternalServiceAttributes, {
        name: 'record',
        description: 'Provides functionality of getting information about external service by id.',
    })
    async record(@Args('idInput') idInput: IdInput) {
        return await this.externalServiceService.getOne(idInput.id)
    }
}