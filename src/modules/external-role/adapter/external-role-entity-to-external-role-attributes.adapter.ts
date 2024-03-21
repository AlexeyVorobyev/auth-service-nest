import { Builder } from 'builder-pattern'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'
import { ExternalRoleEntity } from '@modules/external-role/entity/external-role.entity'
import {
    externalServiceEntityToExternalServiceAttributesAdapter
} from '@modules/external-service/adapter/external-service-entity-to-external-service-attributes.adapter'
import {
    externalServiceEntityToExternalServiceAttributesOmitExternalRolesAdapter
} from '@modules/external-service/adapter/external-service-entity-to-external-service-attributes-omit-external-roles.adapter'

export const externalRoleEntityToExternalRoleAttributesAdapter = (externalRoleInstance: ExternalRoleEntity): ExternalRoleAttributes => {
    const externalRoleAttributesBuilder = Builder<ExternalRoleAttributes>()
    externalRoleAttributesBuilder
        .id(externalRoleInstance.id)
        .description(externalRoleInstance.description)
        .name(externalRoleInstance.name)
        .default(externalRoleInstance.default)
        .createdAt(new Date(externalRoleInstance.createdAt))
        .updatedAt(new Date(externalRoleInstance.updatedAt))
        .externalService(externalServiceEntityToExternalServiceAttributesOmitExternalRolesAdapter(externalRoleInstance.externalService))
        .recognitionKey(externalRoleInstance.recognitionKey)
    return externalRoleAttributesBuilder.build()
}