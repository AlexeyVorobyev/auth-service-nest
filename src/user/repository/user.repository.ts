import { AbstractTypeormRepository } from '@src/common/class/abstract-typeorm-repository'
import { UserEntity } from '../entity/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { Builder } from 'builder-pattern'

@Injectable()
export class UserRepository extends AbstractTypeormRepository<UserEntity> {
	constructor(
		@InjectRepository(UserEntity) typeormRepository: Repository<UserEntity>
	) {
		super(typeormRepository)
	}

	async update(filter: FindOptionsWhere<UserEntity>, entity: Partial<UserEntity>): Promise<void> {
		const userInstance = await super.getOne(filter)
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
	}
}