import { EUniversalExceptionType } from '../enum/exceptions'

export interface IUniversalError {
	messages: string[]
	exceptionBaseClass: EUniversalExceptionType
}