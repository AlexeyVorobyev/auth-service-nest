import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IActiveUserData } from '@modules/common/interface/active-user-data.interface'
import { REQUEST_USER_KEY } from '@modules/common/constant'
import { GqlExecutionContext } from '@nestjs/graphql'

export const ActiveGraphQLUser = createParamDecorator(
    (field: keyof IActiveUserData | undefined, ctx: ExecutionContext) => {
        const request = GqlExecutionContext.create(ctx).getContext().req
        const user: IActiveUserData | undefined = request[REQUEST_USER_KEY]
        return field ? user?.[field] : user
    }
)