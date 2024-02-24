import { Module } from '@nestjs/common'
import { ExternalServiceService } from '@modules/external-service/external-service.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { ExternalServiceRepository } from '@modules/external-service/repository/external-service.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([ExternalServiceEntity]),
    ],
    providers: [ExternalServiceService, ExternalServiceRepository],
    exports: [ExternalServiceService, ExternalServiceRepository]
})
export class ExternalServiceModule {
}