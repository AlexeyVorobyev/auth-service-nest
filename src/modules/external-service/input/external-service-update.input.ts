import { InputType } from '@nestjs/graphql'
import {
    ExternalServiceUpdatePayloadInput,
} from '@modules/external-service/input/external-service-update-payload.input'
import { UpdateEntityInputFactory } from '@modules/graphql/factory/update-entity-input.factory'

@InputType('TExternalServiceUpdateInput')
export class ExternalServiceUpdateInput extends UpdateEntityInputFactory<ExternalServiceUpdatePayloadInput>(ExternalServiceUpdatePayloadInput) {
}