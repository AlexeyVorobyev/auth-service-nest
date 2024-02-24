import { plainToInstance, TransformFnParams } from 'class-transformer'
import { DatePeriodDto } from '@modules/common/dto/date-period.dto'
import { Builder } from 'builder-pattern'
import { UniversalError } from '@modules/common/class/universal-error'
import { EUniversalExceptionType } from '@modules/common/enum/exceptions'

export const apiPayloadDatePeriodDtoAdapter = (transformPayload: string): DatePeriodDto => {
    const splitString = transformPayload.split(',')
    if (splitString.length !== 2) {
        Builder(UniversalError)
            .messages([
                'Not correct value for date period criteria',
                'Must match /^{.+},{.+}$/g regular expression',
            ])
            .exceptionBaseClass(EUniversalExceptionType.badRequest)
            .build().throw()
    }
    const plainObject = {
        startDate: splitString[0].length ? splitString[0] : undefined,
        endDate: splitString[1].length ? splitString[1] : undefined,
    }

    return plainToInstance(DatePeriodDto, plainObject)
}