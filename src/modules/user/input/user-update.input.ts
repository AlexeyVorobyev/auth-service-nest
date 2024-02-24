import { IdInput } from '@modules/graphql/input/id.input'
import { UserUpdatePayloadInput } from '@modules/user/input/user-update-payload.input'
import { Field, InputType } from '@nestjs/graphql'
@InputType('TUserUpdateInput')
export class UserUpdateInput extends IdInput {
    @Field(() => UserUpdatePayloadInput!)
    payload:UserUpdatePayloadInput
}