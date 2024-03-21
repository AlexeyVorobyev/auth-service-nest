import { listAttributesFactory } from '@modules/graphql/attributes/list.attributes'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'
import { ObjectType, OmitType } from '@nestjs/graphql'

@ObjectType('TExternalRoleAttributesOmitOperationMeta')
export class ExternalRoleAttributesOmitOperationMeta extends OmitType(ExternalRoleAttributes, ['operationMeta']) {
}

@ObjectType('TExternalRoleListAttributes')
export class ExternalRoleListAttributes extends listAttributesFactory<ExternalRoleAttributesOmitOperationMeta>(ExternalRoleAttributesOmitOperationMeta) {
}