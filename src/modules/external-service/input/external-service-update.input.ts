import { InputType } from '@nestjs/graphql'
import {
    ExternalServiceUpdatePayloadInput,
} from '@modules/external-service/input/external-service-update-payload.input'
import { updateEntityInputFactory } from '@modules/graphql/factory/update-entity-input.factory'

@InputType('TExternalServiceUpdateInput')
export class ExternalServiceUpdateInput extends updateEntityInputFactory<ExternalServiceUpdatePayloadInput>(ExternalServiceUpdatePayloadInput) {
}