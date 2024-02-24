import { TransformFnParams } from 'class-transformer'

export const apiPayloadToArrayAdapter = <Entity>(transformPayload: TransformFnParams, transformCallback?: (value: string) => Entity): Entity[] => {
    if ((transformPayload.value instanceof Array)) {
        return transformPayload.value.map((item) => transformCallback ? transformCallback(item) : item)
    } else {
        return [transformCallback ? transformCallback(transformPayload.value) : transformPayload.value]
    }
}