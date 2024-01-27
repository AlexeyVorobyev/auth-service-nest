import { plainToInstance } from 'class-transformer'
import { DatePeriodDto } from '@src/common/dto/date-period.dto'

export const apiPayloadDatePeriodDtoAdapter = (transformPayload) => {
	const transformItem = (item: unknown) => {
		if (typeof item === 'string') {
			const splitString = item.split(',')
			if (splitString.length !== 2) {
				return item
			}
			return {
				startDate: splitString[0],
				endDate: splitString[1],
			}
		} else {
			return item
		}
	}

	return plainToInstance(DatePeriodDto, transformItem(transformPayload.value))
}