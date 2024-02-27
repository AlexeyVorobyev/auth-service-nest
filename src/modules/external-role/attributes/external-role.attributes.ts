import { DefaultAttributes } from '@modules/graphql/attributes/default.attributes'
import { Field, ObjectType } from '@nestjs/graphql'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'

@ObjectType('TExternalRoleAttributes')
export class ExternalRoleAttributes extends DefaultAttributes {
    @Field(() => String!, {
        description: 'Name of external role',
    })
    name: string

    @Field(() => String, {
        description: 'Description of external role',
        nullable: true
    })
    description?: string

    @Field(() => String!, {
        description: 'Recognition key of external role',
        nullable: true
    })
    recognitionKey: string

    @Field(() => ExternalServiceAttributes, {
        description: 'External service attributes'
    })
    externalService: ExternalServiceAttributes
}

@ObjectType('TExternalRoleAttributesOmitExternalService')
export class ExternalRoleAttributesOmitExternalService extends DefaultAttributes {
    @Field(() => String!, {
        description: 'Name of external role',
    })
    name: string

    @Field(() => String!, {
        description: 'Recognition key of external role',
        nullable: true
    })
    recognitionKey: string

    @Field(() => String, {
        description: 'Description of external role',
        nullable: true
    })
    description?: string
}