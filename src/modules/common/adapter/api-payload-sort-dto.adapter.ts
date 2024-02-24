import { plainToInstance } from 'class-transformer'
import { SortDto } from '@modules/common/dto/sort.dto'
import { Builder } from 'builder-pattern'
import { UniversalError } from '@modules/common/class/universal-error'
import { EUniversalExceptionType } from '@modules/common/enum/exceptions'

export const apiPayloadSortDtoAdapter = (transformPayload: string): SortDto => {
    const splitString = transformPayload.split(',')
    if (splitString.length !== 2) {
        Builder(UniversalError)
            .messages([
                'Not correct value for sort criteria',
                'Must match /^{.+},(ASC|DESC)$/g regular expression'
            ])
            .exceptionBaseClass(EUniversalExceptionType.badRequest)
            .build().throw()
    }
    const plainObject = {
        columnName: splitString[0],
        direction: splitString[1],
    }

    return plainToInstance(SortDto, plainObject)
}