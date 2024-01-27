import { AbstractTypeormRepository } from '@src/common/class/abstract-typeorm-repository'
import { UserEntity } from '../entity/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { Builder } from 'builder-pattern'
import { EPostgreSQLErrorCode } from '@src/common/enum/EPostgreSQLErrorCode'
import { UniversalError } from '@src/common/class/universal-error'
import { EUniversalExceptionType } from '@src/common/enum/exceptions'

@Injectable()
export class UserRepository extends AbstractTypeormRepository<UserEntity> {
	constructor(
		@InjectRepository(UserEntity) typeormRepository: Repository<UserEntity>
	) {
		super(typeormRepository)
	}

	async update(filter: FindOptionsWhere<UserEntity>, entity: Partial<UserEntity>): Promise<void> {
		const userInstance = await super.getOne(filter)
		try {
			await this.typeormRepository.save(
				Builder(UserEntity)
					.id(userInstance.id)
					.createdAt(userInstance.createdAt)
					.updatedAt(userInstance.updatedAt)
					.password(entity?.password || userInstance.password)
					.email(entity?.email || userInstance.email)
					.roles(entity?.roles || userInstance.roles)
					.build()
			)
		} catch (error) {
			if (error.code === EPostgreSQLErrorCode.uniqueViolation) {
				Builder(UniversalError)
					.messages([
						`Entity with provided fields already exist`,
						error?.detail
					])
					.exceptionBaseClass(EUniversalExceptionType.conflict)
					.build().throw()
			} else {
				Builder(UniversalError)
					.messages([
						`Internal server error`,
						error?.message
					])
					.exceptionBaseClass(EUniversalExceptionType.server)
					.build().throw()
			}
		}
	}
}