import { Field, ObjectType } from '@nestjs/graphql'
import { ERole } from '@modules/common/enum/role.enum'
import { DefaultAttributes } from '@modules/graphql/attributes/default.attributes'

@ObjectType('TUserAttributes')
export class UserAttributes extends DefaultAttributes {
    @Field(() => String!, {
        description: 'Email of user',
    })
    email: string

    @Field(() => [ERole]!, {
        description: 'Updated roles',
    })
    roles: ERole[]

    // @ApiProperty({
    //     description: 'User external services',
    //     type: [ExternalServiceResponseDto],
    // })
    // externalServices: ExternalServiceResponseDto[]

    @Field(() => Boolean!, {
        description: 'Defines are user verified',
    })
    verified: boolean
}