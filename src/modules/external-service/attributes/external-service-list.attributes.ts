import { listAttributesFactory } from '@modules/graphql/attributes/list.attributes'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'
import { ObjectType } from '@nestjs/graphql'

@ObjectType('TExternalServiceListAttributes')
export class ExternalServiceListAttributes extends listAttributesFactory<ExternalServiceAttributes>(ExternalServiceAttributes) {
}