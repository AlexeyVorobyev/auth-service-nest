import { Builder } from 'builder-pattern'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'
import { ExternalRoleEntity } from '@modules/external-role/entity/external-role.entity'

export const externalRoleEntityToExternalRoleAttributesAdapter = (externalRoleInstance: ExternalRoleEntity): ExternalRoleAttributes => {
    const externalRoleAttributesBuilder = Builder<ExternalRoleAttributes>()
    externalRoleAttributesBuilder
        .id(externalRoleInstance.id)
        .description(externalRoleInstance.description)
        .name(externalRoleInstance.name)
        .createdAt(new Date(externalRoleInstance.createdAt))
        .updatedAt(new Date(externalRoleInstance.updatedAt))
        .externalService(externalRoleInstance.externalService)
        .recognitionKey(externalRoleInstance.recognitionKey)
    return externalRoleAttributesBuilder.build()
}