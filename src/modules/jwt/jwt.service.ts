import { Inject } from '@nestjs/common'
import { JwtService as JwtNestService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { Builder } from 'builder-pattern'
import { EJwtStrategy } from '@modules/jwt/enum/jwt-strategy.enum'
import { IActiveUserData } from '@modules/common/interface/active-user-data.interface'
import { UniversalError } from '@modules/common/class/universal-error'
import { EUniversalExceptionType } from '@modules/common/enum/exceptions'
import { UserEntity } from '@modules/user/entity/user.entity'

export class JwtService {
	constructor(
		@Inject('JwtAccessService')
		private readonly jwtAccessService: JwtNestService,
		@Inject('JwtRefreshService')
		private readonly jwtRefreshService: JwtNestService,
		@Inject('JwtVerifyService')
		private readonly jwtVerifyService: JwtNestService
	) {
	}

	async verifyToken(
		jwtToken: string,
		strategy: EJwtStrategy
	): Promise<IActiveUserData> {
		try {
			switch (strategy) {
				case EJwtStrategy.access:
					return await this.jwtAccessService.verifyAsync<IActiveUserData>(jwtToken)
				case EJwtStrategy.refresh:
					return await this.jwtRefreshService.verifyAsync<IActiveUserData>(jwtToken)
				case EJwtStrategy.verify:
					return await this.jwtVerifyService.verifyAsync<IActiveUserData>(jwtToken)
			}
		} catch (error) {
			Builder(UniversalError)
				.messages([error.message])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}
	}

	async generateToken(
		user: UserEntity,
		strategy: EJwtStrategy
	): Promise<string> {
		const jwtStrategyPayload: IActiveUserData = {
			id: user.id,
			email: user.email,
			role: user.role,
			tokenId: randomUUID()
		}

		switch (strategy) {
			case EJwtStrategy.access:
				return await this.jwtAccessService.signAsync(jwtStrategyPayload)
			case EJwtStrategy.refresh:
				return await this.jwtRefreshService.signAsync(jwtStrategyPayload)
			case EJwtStrategy.verify:
				return await this.jwtVerifyService.signAsync(jwtStrategyPayload)
		}
	}
}