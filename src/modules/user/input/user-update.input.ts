import { IdInput } from '@modules/graphql/input/id.input'
import { UserUpdatePayloadInput } from '@modules/user/input/user-update-payload.input'
import { Field, InputType } from '@nestjs/graphql'
import { UpdateEntityInputFactory } from '@modules/graphql/factory/update-entity-input.factory'

@InputType('TUserUpdateInput')
export class UserUpdateInput extends UpdateEntityInputFactory<UserUpdatePayloadInput>(UserUpdatePayloadInput) {
}