import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'
import { ExternalServiceService } from '@modules/external-service/external-service.service'
import { Roles } from '@modules/common/decorator/roles.decorator'
import { JwtGraphQLAuthGuard } from '@modules/common/guard/jwt-graphql-auth.guard'
import { ERole } from '@modules/common/enum/role.enum'
import { RoleGraphQLGuard } from '@modules/common/guard/role-graphql.guard'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'
import { ExternalServiceCreateInput } from '@modules/external-service/input/external-service-create.input'
import { ExternalServiceUpdateInput } from '@modules/external-service/input/external-service-update.input'
import { IdInput } from '@modules/graphql/input/id.input'
import { OperationMetaInterceptor } from '@modules/graphql/interceptor/operation-meta.interceptor'
import {DeleteAttributes} from '@modules/graphql/attributes/delete.attributes'


@ObjectType('TExternalServiceMutations')
export class ExternalServiceMutations {
}

@UseInterceptors(OperationMetaInterceptor)
@Resolver(() => ExternalServiceMutations)
export class ExternalServiceMutationResolver {
    constructor(
        @Inject(ExternalServiceService)
        private externalServiceService: ExternalServiceService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => ExternalServiceAttributes, {
        name: 'create',
        description: 'Provides functionality of creating external service.',
    })
    async create(
        @Args('input') input: ExternalServiceCreateInput,
    ) {
        return await this.externalServiceService.create(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => ExternalServiceAttributes, {
        name: 'update',
        description: 'Provides functionality of editing external service by id.',
    })
    async update(
        @Args('input') input: ExternalServiceUpdateInput,
    ) {
        return await this.externalServiceService.update(input.id, input.payload)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(ERole.Admin, ERole.Moderator)
    @ResolveField(() => DeleteAttributes, {
        name: 'delete',
        description: 'Provides functionality of deleting external service by id.',
    })
    async delete(
        @Args('input') input: IdInput,
    ) {
        return await this.externalServiceService.delete(input.id)
    }
}