import { AbstractTypeormRepository } from '@src/common/class/abstract-typeorm-repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity } from '../entity/role.entity'

@Injectable()
export class RoleRepository extends AbstractTypeormRepository<RoleEntity> {
	constructor(
		@InjectRepository(RoleEntity) typeormRepository: Repository<RoleEntity>
	) {
		super(typeormRepository)
	}
}