import { GraphqlErrorAttributes } from '@modules/graphql/attributes/graphql-error.attributes'
import { Builder } from 'builder-pattern'

export const graphqlFormattedErrorToGraphqlErrorAttributesAdapter = (error: any) => (
    error.extensions.originalError
        ? Builder<GraphqlErrorAttributes>()
            .message(error.extensions.originalError.message)
            .error(error.extensions.originalError.error)
            .statusCode(error.extensions.originalError.statusCode)
            .build()
        : Builder<GraphqlErrorAttributes>()
            .message([error.message])
            .error("Graphql validation error")
            .statusCode(400)
            .build()
)