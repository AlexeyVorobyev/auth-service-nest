import { DefaultEntityAttributes } from '@modules/graphql/attributes/default-entity.attributes'
import { Field, ObjectType } from '@nestjs/graphql'
import {
    ExternalRoleAttributes,
    ExternalRoleAttributesOmitExternalService,
} from '@modules/external-role/attributes/external-role.attributes'
import { DefaultEntityRestAttributes } from '@modules/common/attributes/default-entity-rest.attributes'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'
import { ApiProperty } from '@nestjs/swagger'
import {
    ExternalRoleRestAttributesOmitExternalService,
} from '@modules/external-role/attributes/external-role-rest.attributes'

export class ExternalServiceRestAttributes extends DefaultEntityRestAttributes implements ExternalServiceAttributes {
    @ApiProperty({
        description: 'Name of external service',
    })
    name: string

    @ApiProperty({
        description: 'Description of external service',
        nullable: true,
    })
    description?: string

    @Field(() => String!, {
        description: 'Recognition key of external service',
        nullable: true,
    })
    @ApiProperty({
        description: 'Recognition key of external service',
    })
    recognitionKey: string

    @ApiProperty({
        description: 'External role attributes',
        type: () => [ExternalRoleRestAttributesOmitExternalService],
    })
    externalRoles: ExternalRoleRestAttributesOmitExternalService[]
}

export class ExternalServiceRestAttributesOmitExternalService
    extends DefaultEntityRestAttributes
    implements Omit<ExternalServiceRestAttributes, 'externalRoles'> {
    @ApiProperty({
        description: 'Name of external service',
    })
    name: string

    @ApiProperty({
        description: 'Description of external service',
        nullable: true,
    })
    description?: string

    @Field(() => String!, {
        description: 'Recognition key of external service',
        nullable: true,
    })
    @ApiProperty({
        description: 'Recognition key of external service',
    })
    recognitionKey: string
}