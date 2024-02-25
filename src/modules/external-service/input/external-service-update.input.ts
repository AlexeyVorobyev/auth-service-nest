import { Field, InputType } from '@nestjs/graphql'
import {
    ExternalServiceUpdatePayloadInput,
} from '@modules/external-service/input/external-service-update-payload.input'
import { UpdateEntityInput } from '@modules/graphql/input/update-entity.input'

@InputType('TExternalServiceUpdateInput')
export class ExternalServiceUpdateInput extends UpdateEntityInput<ExternalServiceUpdatePayloadInput> {
    // @Field(() => ExternalServiceUpdatePayloadInput)
    // payload: ExternalServiceUpdatePayloadInput
}