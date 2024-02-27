import { listAttributesFactory } from '@modules/graphql/attributes/list.attributes'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'
import { ObjectType } from '@nestjs/graphql'

@ObjectType('TExternalRoleListAttributes')
export class ExternalRoleListAttributes extends listAttributesFactory<ExternalRoleAttributes>(ExternalRoleAttributes) {
}