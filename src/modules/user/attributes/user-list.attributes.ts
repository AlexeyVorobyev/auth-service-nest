import { listAttributesFactory } from '@modules/graphql/attributes/list.attributes'
import { UserAttributes } from '@modules/user/attributes/user-attributes'
import { ObjectType } from '@nestjs/graphql'

@ObjectType('TUserListAttributes')
export class UserListAttributes extends listAttributesFactory<UserAttributes>(UserAttributes) {
}