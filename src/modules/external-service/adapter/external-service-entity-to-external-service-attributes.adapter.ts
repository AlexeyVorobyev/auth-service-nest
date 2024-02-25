import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { Builder } from 'builder-pattern'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'

export const externalServiceEntityToExternalServiceAttributesAdapter= (externalServiceInstance: ExternalServiceEntity): ExternalServiceAttributes => {
    const externalServiceAttributesBuilder = Builder<ExternalServiceAttributes>()
    externalServiceAttributesBuilder
        .id(externalServiceInstance.id)
        .description(externalServiceInstance.description)
        .name(externalServiceInstance.name)
        .createdAt(externalServiceInstance.createdAt)
        .updatedAt(externalServiceInstance.updatedAt)
        .recognitionKey(externalServiceInstance.recognitionKey)
    return externalServiceAttributesBuilder.build()
}