import { IUniversalError } from '../interface/universal-error'
import { EExceptions } from '../enum/exceptions'
import { BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common'

export class UniversalError implements IUniversalError {
	messages:string[]
	exceptionBaseClass:EExceptions
	constructor(
		messages:string[],
		exceptionBaseClass:EExceptions
	) {
		this.messages = messages
		this.exceptionBaseClass = exceptionBaseClass
	}

	throw() {
		switch (this.exceptionBaseClass) {
			case EExceptions.unauthorized:
				throw new UnauthorizedException(this.messages)
			case EExceptions.forbidden:
				throw new ForbiddenException(this.messages)
			case EExceptions.badRequest:
				throw new BadRequestException(this.messages)
		}
	}

}
