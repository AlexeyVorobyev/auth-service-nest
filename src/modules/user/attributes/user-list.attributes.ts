import { listAttributesFactory } from '@modules/graphql/attributes/list.attributes'
import { UserAttributes } from '@modules/user/attributes/user.attributes'
import { ObjectType, OmitType } from '@nestjs/graphql'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'

@ObjectType('TUserAttributesOmitOperationMeta')
export class UserListAttributesOmitOperationMeta extends OmitType(UserAttributes, ['operationMeta']) {
}
@ObjectType('TUserListAttributes')
export class UserListAttributes extends listAttributesFactory<UserListAttributesOmitOperationMeta>(UserListAttributesOmitOperationMeta) {
}