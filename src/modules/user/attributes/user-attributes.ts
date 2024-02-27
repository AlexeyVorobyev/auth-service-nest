import { Field, ObjectType } from '@nestjs/graphql'
import { ERole } from '@modules/common/enum/role.enum'
import { DefaultAttributes } from '@modules/graphql/attributes/default.attributes'
import { ExternalServiceAttributes } from '@modules/external-service/attributes/external-service.attributes'
import { ExternalRoleAttributes } from '@modules/external-role/attributes/external-role.attributes'

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

    @Field(() => [ExternalRoleAttributes]!, {
        description: 'External roles of user',
    })
    externalRoles: ExternalRoleAttributes[]

    @Field(() => Boolean!, {
        description: 'Defines are user verified',
    })
    verified: boolean
}