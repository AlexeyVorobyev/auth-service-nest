import { AbstractTypeormRepository } from '../../common/class/abstract-typeorm-repository'
import { UserEntity } from '../entity/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostgreSQLErrorCodeEnum } from '@src/common/enum/PostgreSQLErrorCode.enum'
import { Builder } from 'builder-pattern'
import { UniversalError } from '@src/common/class/universal-error'
import { EUniversalExceptionType } from '@src/common/enum/exceptions'

@Injectable()
export class UserRepository extends AbstractTypeormRepository<UserEntity> {
	constructor(
		@InjectRepository(UserEntity) entryPoint: Repository<UserEntity>
	) {
		super(entryPoint)
	}

	async saveOne(entity: UserEntity): Promise<UserEntity> {
		try {
			return await super.saveOne(entity)
		} catch (error) {
			if (error.code === PostgreSQLErrorCodeEnum.UniqueViolation) {
				Builder(UniversalError)
					.messages([`User [${entity.email}] already exist`])
					.exceptionBaseClass(EUniversalExceptionType.conflict)
					.build().throw()
			}
			throw error
		}
	}
}