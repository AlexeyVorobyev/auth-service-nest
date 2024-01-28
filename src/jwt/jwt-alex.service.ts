import { Inject } from '@nestjs/common'
import { UserEntity } from '@src/user/entity/user.entity'
import { randomUUID } from 'crypto'
import { RoleEntity } from '@src/role/entity/role.entity'
import { IActiveUserData } from '@src/common/interface/active-user-data.interface'
import { JwtService } from '@nestjs/jwt'
import { Builder } from 'builder-pattern'
import { UniversalError } from '@src/common/class/universal-error'
import { EUniversalExceptionType } from '@src/common/enum/exceptions'
import { EJwtStrategy } from '@src/common/enum/jwt-strategy.enum'

export class JwtAlexService {
	constructor(
		@Inject('JwtAccessService')
		private readonly jwtAccessService: JwtService,
		@Inject('JwtRefreshService')
		private readonly jwtRefreshService: JwtService,
		@Inject('JwtVerifyService')
		private readonly jwtVerifyService: JwtService
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
			roles: user.roles.map((roleEntity: RoleEntity) => roleEntity.name),
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