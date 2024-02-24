import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { ExternalServiceResponseDto } from '@modules/external-service/dto/external-service-response.dto'
import { Builder } from 'builder-pattern'

export const externalServiceEntityToExternalServiceResponseDtoAdapter = (externalServiceInstance: ExternalServiceEntity): ExternalServiceResponseDto => {
    const externalServiceResponseDtoBuilder = Builder<ExternalServiceResponseDto>()
    externalServiceResponseDtoBuilder
        .id(externalServiceInstance.id)
        .description(externalServiceInstance.description)
        .name(externalServiceInstance.name)
        .createdAt(externalServiceInstance.createdAt)
        .updatedAt(externalServiceInstance.updatedAt)
        .recognitionKey(externalServiceInstance.recognitionKey)
    return externalServiceResponseDtoBuilder.build()
}