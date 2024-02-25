import { DefaultAttributes } from '@modules/graphql/attributes/default.attributes'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('TExternalServiceAttributes')
export class ExternalServiceAttributes extends DefaultAttributes {
    @Field(() => String!, {
        description: 'Name of external service',
    })
    name: string

    @Field(() => String, {
        description: 'Description of external service',
        nullable: true
    })
    description?: string

    @Field(() => String!, {
        description: 'Recognition key of external service',
        nullable: true
    })
    recognitionKey: string

    // @ApiProperty({
    //     description: 'Roles, which works in that particular service',
    //     type: [String]
    // })
    // roles?: string
}