import { Field, ObjectType } from '@nestjs/graphql'
import { ERole } from '@modules/common/enum/role.enum'
import { DefaultAttributes } from '@modules/graphql/attributes/default.attributes'
import { UUID } from '@modules/graphql/scalar/uuid.scalar'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'

@ObjectType('TUserAttributes')
export class UserAttributes extends DefaultAttributes {
    @Field(() => String!, {
        description: 'Email of user',
    })
    email: string

    @Field(() => ERole!, {
        description: 'Role of user',
    })
    role: ERole

    @Field(() => [ExternalServiceAttributes]!, {
        description: 'External services of user',
    })
    externalServices: ExternalServiceAttributes[]

    @Field(() => Boolean!, {
        description: 'Defines are user verified',
    })
    verified: boolean
}