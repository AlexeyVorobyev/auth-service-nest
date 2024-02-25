import { Module } from '@nestjs/common'
import { ExternalServiceService } from '@modules/external-service/external-service.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { ExternalServiceRepository } from '@modules/external-service/repository/external-service.repository'
import { ExternalServiceQueryResolver } from '@modules/external-service/resolver/external-service-query.resolver'
import { JwtAlexModule } from '@modules/jwt/jwt-alex.module'
import { ExternalServiceMutationResolver } from '@modules/external-service/resolver/external-service-mutation.resolver'

@Module({
    imports: [
        TypeOrmModule.forFeature([ExternalServiceEntity]),
        JwtAlexModule,
    ],
    providers: [
        ExternalServiceService,
        ExternalServiceRepository,
        ExternalServiceQueryResolver,
        ExternalServiceMutationResolver,
    ],
    exports: [
        ExternalServiceService,
        ExternalServiceRepository,
        ExternalServiceQueryResolver,
        ExternalServiceMutationResolver,
    ],
})
export class ExternalServiceModule {
}