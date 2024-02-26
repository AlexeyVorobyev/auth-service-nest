import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UUID } from '@modules/graphql/scalar/uuid.scalar'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            context: ({ req, connection }) => (
                connection
                    ? { req: connection.context }
                    : { req: req }),
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            resolvers: { UUID: UUID },
            sortSchema: true,
            playground: true,
            fieldResolverEnhancers: ['guards']
        }),
    ],
    exports: [GraphQLModule],
})
export class GraphqlModule {
}