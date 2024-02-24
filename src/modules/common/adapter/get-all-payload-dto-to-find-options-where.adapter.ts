import { Between, FindOptionsWhere, In } from 'typeorm'
import { GetAllPayloadDto } from '@modules/common/dto/get-all-payload.dto'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'

/**
 *  Adapter, which converts getAllPayloadDto to filter for entity based on DefaultDatabaseEntity
 * */
export const getAllPayloadDtoToFindOptionsWhereAdapter = <Entity>(getAllPayloadDtoInstance: GetAllPayloadDto): FindOptionsWhere<DefaultDatabaseEntity<Entity>> => ({
    id: getAllPayloadDtoInstance.id
        ? In(getAllPayloadDtoInstance.id)
        : undefined,
    createdAt: getAllPayloadDtoInstance.createDatePeriod ? Between(
        getAllPayloadDtoInstance.createDatePeriod.startDate || new Date(new Date().setFullYear(0, 0, 0)),
        getAllPayloadDtoInstance.createDatePeriod.endDate || new Date(new Date().setFullYear(10000, 0, 0)),
    ) : undefined,
    updatedAt: getAllPayloadDtoInstance.updateDatePeriod ? Between(
        getAllPayloadDtoInstance.updateDatePeriod.startDate || new Date(new Date().setFullYear(0, 0, 0)),
        getAllPayloadDtoInstance.updateDatePeriod.endDate || new Date(new Date().setFullYear(10000, 0, 0)),
    ) : undefined,
})