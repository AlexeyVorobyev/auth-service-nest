import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './entity/role.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERole } from '../common/enum/role.enum'
import { Builder } from 'builder-pattern'

@Injectable()
export class RoleService implements OnModuleInit {
	private rolesList: string[]

	constructor(
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>
	) {
		this.rolesList = Object.values(ERole)
	}

	async findOneByProperties(properties: FindOptionsWhere<RoleEntity>): Promise<RoleEntity> {
		return await this.roleRepository.findOne({ where: properties })
	}

	initBaseRoles(): void {
		this.rolesList.forEach(async (role: ERole) => {
			if (await this.findOneByProperties({ name: role })) {
				return
			}

			const RoleEntityBuilder = Builder(RoleEntity)
			RoleEntityBuilder
				.name(role)
			await this.roleRepository.save(RoleEntityBuilder.build())
		})
	}

	onModuleInit(): void {
		this.initBaseRoles()
	}
}