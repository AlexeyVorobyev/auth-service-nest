import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity } from '../entity/role.entity'
import { AbstractTypeormRepository } from '@modules/common/class/abstract-typeorm-repository'

@Injectable()
export class RoleRepository extends AbstractTypeormRepository<RoleEntity> {
	constructor(
		@InjectRepository(RoleEntity) typeormRepository: Repository<RoleEntity>
	) {
		super(typeormRepository)
	}
}