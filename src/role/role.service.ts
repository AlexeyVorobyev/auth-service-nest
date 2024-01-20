import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './entity/role.entity'
import { Repository } from 'typeorm'
import { ERole } from '../common/enums/role.enum'
import { Builder } from 'builder-pattern'

@Injectable()
export class RoleService implements OnModuleInit {
	private rolesList: string[]
	constructor(
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>,
	) {
		this.rolesList = Object.values(ERole)
	}

	async findByName(name: string): Promise<RoleEntity> {
		return await this.roleRepository.findOne({ where: { name: name } })
	}

	initBaseRoles(): void {
		this.rolesList.forEach(async (role: ERole) => {
			if (await this.findByName(role)) {
				return
			}

			const RoleEntityBuilder = Builder(RoleEntity)
			RoleEntityBuilder.name(role)
			console.log(this.roleRepository.save(RoleEntityBuilder.build()))
		})
	}

	onModuleInit(): void {
		this.initBaseRoles()
	}
}