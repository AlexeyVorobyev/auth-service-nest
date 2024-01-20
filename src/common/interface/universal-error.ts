import { EExceptions } from '../enum/exceptions'

export interface IUniversalError {
	messages: string[]
	exceptionBaseClass: EExceptions
}