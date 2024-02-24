import { Inject, Injectable } from '@nestjs/common'
import { ExternalServiceRepository } from '@modules/external-service/repository/external-service.repository'

@Injectable()
export class ExternalServiceService {
    constructor(
        @Inject(ExternalServiceRepository)
        private externalServiceRepository: ExternalServiceRepository,
    ) {
    }

}