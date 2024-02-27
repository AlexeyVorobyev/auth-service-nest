import { updateEntityInputFactory } from '@modules/graphql/factory/update-entity-input.factory'
import { ExternalRoleUpdatePayloadInput } from '@modules/external-role/input/external-role-update-payload.input'
import { InputType } from '@nestjs/graphql'

@InputType('TExternalRoleUpdateInput')
export class ExternalRoleUpdateInput extends updateEntityInputFactory<ExternalRoleUpdatePayloadInput>(ExternalRoleUpdatePayloadInput) {
}