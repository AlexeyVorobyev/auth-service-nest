import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { Builder } from 'builder-pattern'
import {
    ExternalServiceAttributesOmitExternalRoles,
} from '@modules/external-service/attributes/external-service.attributes'

export const externalServiceEntityToExternalServiceAttributesOmitExternalRolesAdapter = (externalServiceInstance: ExternalServiceEntity): ExternalServiceAttributesOmitExternalRoles => {
    const externalServiceAttributesOmitExternalRolesBuilder = Builder<ExternalServiceAttributesOmitExternalRoles>()
    externalServiceAttributesOmitExternalRolesBuilder
        .id(externalServiceInstance.id)
        .description(externalServiceInstance.description)
        .name(externalServiceInstance.name)
        .createdAt(new Date(externalServiceInstance.createdAt))
        .updatedAt(new Date(externalServiceInstance.updatedAt))
        .recognitionKey(externalServiceInstance.recognitionKey)
    return externalServiceAttributesOmitExternalRolesBuilder.build()
}