import { Between, FindOptionsWhere, In } from 'typeorm'
import { GetAllPayloadDto } from '@modules/common/dto/get-all-payload.dto'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'
import { ListInput } from '@modules/graphql/input/list.input'

/**
 *  Adapter, which converts getAllPayloadDto to filter for entity based on DefaultDatabaseEntity
 * */
export const listInputToFindOptionsWhereAdapter = <Entity>(input: ListInput): FindOptionsWhere<DefaultDatabaseEntity<Entity>> => ({
    id: input.id
        ? In(input.id)
        : undefined,
    createdAt: input.createDatePeriod ? Between(
        input.createDatePeriod.startDate || new Date(new Date().setFullYear(0, 0, 0)),
        input.createDatePeriod.endDate || new Date(new Date().setFullYear(10000, 0, 0)),
    ) : undefined,
    updatedAt: input.updateDatePeriod ? Between(
        input.updateDatePeriod.startDate || new Date(new Date().setFullYear(0, 0, 0)),
        input.updateDatePeriod.endDate || new Date(new Date().setFullYear(10000, 0, 0)),
    ) : undefined,
})