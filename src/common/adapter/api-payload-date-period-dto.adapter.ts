import { plainToInstance, TransformFnParams } from 'class-transformer'
import { DatePeriodDto } from '@src/common/dto/date-period.dto'

export const apiPayloadDatePeriodDtoAdapter = (transformPayload: TransformFnParams): DatePeriodDto => {
	const transformItem = (item: unknown) => {
		if (typeof item === 'string') {
			const splitString = item.split(',')
			if (splitString.length !== 2) {
				return item
			}
			return {
				startDate: splitString[0].length ? splitString[0] : undefined,
				endDate: splitString[1].length ? splitString[1] : undefined
			}
		} else {
			return item
		}
	}

	return plainToInstance(DatePeriodDto, transformItem(transformPayload.value))
}