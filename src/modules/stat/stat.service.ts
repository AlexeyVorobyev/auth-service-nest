import {Injectable} from '@nestjs/common'
import {StatUserRegistrationHistoryInput} from '@modules/stat/input/stat-user-registration-history.input'
import {UserRepository} from '@modules/user/repository/user.repository'
import {Between, FindOptionsWhere} from 'typeorm'
import {UserEntity} from '@modules/user/entity/user.entity'
import {ETimeAggregation} from '@modules/stat/enum/time-aggregation.enum'
import {TStatValue} from '@modules/stat/type/stat-value.type'
import {Builder} from 'builder-pattern'
import {UserRegistrationHistoryListAttributes} from '@modules/stat/attributes/user-registration-history-list.attributes'
import {UserTotalAmountAttributes} from '@modules/stat/attributes/user-total-amount.attributes'
import {StatSummaryAttributes} from '@modules/stat/attributes/stat-summary.attributes'

@Injectable()
export class StatService {
    constructor(
        private userRepository: UserRepository,
    ) {
    }

    async userRegistrationHistoryList(input: StatUserRegistrationHistoryInput): Promise<UserRegistrationHistoryListAttributes> {
        const filter: FindOptionsWhere<UserEntity> = {
            createdAt: input.datePeriod ? Between(
                input.datePeriod.startDate || new Date(new Date().setFullYear(0, 0, 0)),
                input.datePeriod.endDate || new Date(new Date().setFullYear(10000, 0, 0)),
            ) : undefined,
        }

        const userInstanceList = await this.userRepository.getAll(
            filter,
            undefined,
        )

        const statValues: TStatValue[] = userInstanceList.map((item) => ({
            time: new Date(item.createdAt),
            value: 1
        }))

        if (input.timeAggregation === ETimeAggregation.NO_AGG) {
            return Builder<UserRegistrationHistoryListAttributes>()
                .data(statValues)
                .summary(
                    Builder<StatSummaryAttributes>()
                        .min(Math.min(...statValues.map((item) => item.value)))
                        .max(Math.max(...statValues.map((item) => item.value)))
                        .sum(statValues.map((item) => item.value)
                            .reduce((acc, item) => acc + item))
                        .mean(statValues.map((item) => item.value)
                            .reduce((acc, item) => acc + item)/statValues.length)
                        .last(statValues[statValues.length - 1].value)
                    .build()
                )
                .build()
        }

        const newValues = this.aggregateByTime(
            statValues,
            input.timeAggregation,
            input.datePeriod.startDate,
            input.datePeriod.endDate
        )

        return Builder<UserRegistrationHistoryListAttributes>()
            .data(newValues)
            .summary(
                Builder<StatSummaryAttributes>()
                    .min(Math.min(...newValues.map((item) => item.value)))
                    .max(Math.max(...newValues.map((item) => item.value)))
                    .sum(newValues.map((item) => item.value)
                        .reduce((acc, item) => acc + item))
                    .mean(newValues.map((item) => item.value)
                        .reduce((acc, item) => acc + item)/newValues.length)
                    .last(newValues[newValues.length - 1].value)
                    .build()
            )
            .build()
    }

    async userTotalAmount(): Promise<UserTotalAmountAttributes> {
        return Builder<UserTotalAmountAttributes>()
            .data(await this.userRepository.count())
            .build()
    }

    private aggregateByTime(
        values: TStatValue[],
        aggregation: ETimeAggregation,
        startDate: Date,
        endDate: Date
    ): TStatValue[] {
        let delta
        switch (aggregation) {
            case ETimeAggregation.DAY:
                delta = 86400000
                break
            case ETimeAggregation.HOUR:
                delta = 3600000
                break
            case ETimeAggregation.MINUTE:
                delta = 60000
                break
            case ETimeAggregation.MONTH:
                delta = 2635200000
                break
            case ETimeAggregation.YEAR:
                delta = 31536000000
                break
            case ETimeAggregation.WEEK:
                delta = 604800000
                break
            case ETimeAggregation.NO_AGG:
                return values
        }
        let clusters = [{
            startDate: Date.parse(startDate.toUTCString()),
            endDate: Date.parse(startDate.toUTCString()) + delta
        }]
        while (clusters[clusters.length - 1].endDate + delta < Date.parse(endDate.toUTCString()) + delta/2) {
            clusters.push({
                startDate: clusters[clusters.length - 1].endDate,
                endDate: clusters[clusters.length - 1].endDate + delta
            })
        }

        let data: number[] = Array(clusters.length).fill(0)
        clusters.forEach((item, index) => {
            data[index] = values.filter((_item) => (
                Date.parse(_item.time.toUTCString()) >= item.startDate
                && Date.parse(_item.time.toUTCString()) <= item.endDate
            )).length
        })

        return clusters.map((item, index) => ({
            time: new Date((item.startDate + item.endDate)/2),
            value: data[index]
        }))
    }
}