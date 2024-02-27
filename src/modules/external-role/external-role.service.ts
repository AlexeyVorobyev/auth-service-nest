import { Inject, Injectable } from '@nestjs/common'
import { ExternalRoleRepository } from '@modules/external-role/repository/external-role.repository'
import { ExternalRoleListInput } from '@modules/external-role/input/external-role-list.input'
import { ExternalRoleListAttributes } from '@modules/external-role/attributes/external-role-list.attributes'
import { FindOptionsWhere, Like } from 'typeorm'
import { ExternalRoleEntity } from '@modules/external-role/entity/external-role.entity'
import { listInputToFindOptionsWhereAdapter } from '@modules/graphql/adapter/list-input-to-find-options-where.adapter'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'
import {
    externalRoleEntityToExternalRoleAttributesAdapter,
} from '@modules/external-role/adapter/external-role-entity-to-external-role-attributes.adapter'
import {
    sortInputListToFindOptionsOrderAdapter,
} from '@modules/graphql/adapter/sort-input-list-to-find-options-order.adapter'
import { Builder } from 'builder-pattern'
import { ListMetaAttributes } from '@modules/graphql/attributes/list-meta.attributes'
import { ExternalRoleCreateInput } from '@modules/external-role/input/external-role-create.input'
import { ExternalRoleUpdatePayloadInput } from '@modules/external-role/input/external-role-update-payload.input'

@Injectable()
export class ExternalRoleService {
    constructor(
        @Inject(ExternalRoleRepository)
        private readonly externalRoleRepository: ExternalRoleRepository,
    ) {
    }

    async getAll(input: ExternalRoleListInput): Promise<ExternalRoleListAttributes> {
        const filter: FindOptionsWhere<ExternalRoleEntity>[] = ['name', 'description'].map((item) => ({
            ...listInputToFindOptionsWhereAdapter<ExternalRoleEntity>(input),
            [item]: input.simpleFilter ? Like(`%${input.simpleFilter}%`) : undefined,
        }))

        const externalRoleEntityInstanceList = await this.externalRoleRepository.getAll(
            filter,
            sortInputListToFindOptionsOrderAdapter<ExternalRoleEntity>(
                input.sort,
                Builder<ExternalRoleEntity>()
                    .id(null).name(null).description(null)
                    .createdAt(null).updatedAt(null)
                    .build(),
            ),
            input.page,
            input.perPage,
            {
                users: true,
                externalService: true,
            },
        )

        const totalElements = await this.externalRoleRepository.count(filter)

        const externalRoleListAttributesBuilder = Builder<ExternalRoleListAttributes>()
        externalRoleListAttributesBuilder
            .data(
                externalRoleEntityInstanceList
                    .map((item) => externalRoleEntityToExternalRoleAttributesAdapter(item)),
            )
            .meta(
                Builder<ListMetaAttributes>()
                    .currentPage(input.page)
                    .elementsPerPage(input.perPage)
                    .totalElements(totalElements)
                    .totalPages(Math.ceil(totalElements / input.perPage))
                    .build(),
            )
        return externalRoleListAttributesBuilder.build()
    }

    async getOne(id: string): Promise<ExternalRoleAttributes> {
        const externalRole = await this.externalRoleRepository.getOne(
            { id: id },
            {
                users: true,
                externalService: true,
            },
        )
        return externalRoleEntityToExternalRoleAttributesAdapter(externalRole)
    }

    async create(input: ExternalRoleCreateInput): Promise<ExternalRoleAttributes> {
        const externalRoleEntityBuilder = Builder<ExternalRoleEntity>()

        externalRoleEntityBuilder
            .name(input.name)
            .description(input.description)
            .externalServiceId(input.externalServiceId)
            .recognitionKey(input.recognitionKey)

        return await this.externalRoleRepository.saveOne(externalRoleEntityBuilder.build())
    }

    async update(id: string, input: ExternalRoleUpdatePayloadInput): Promise<ExternalRoleAttributes> {
        await this.externalRoleRepository.update(
            { id: id },
            Builder<ExternalRoleEntity>()
                .description(input.description)
                .name(input.name)
                .externalServiceId(input.externalServiceId)
                .build(),
        )

        return await this.getOne(id)
    }

    async delete(id: string): Promise<string> {
        await this.externalRoleRepository.delete({ id: id })
        return id
    }
}