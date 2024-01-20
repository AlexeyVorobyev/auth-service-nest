import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UserEntity } from './entity/user.entity'
import { MeResponseDto } from './dto/me-response.dto'
import { Builder } from 'builder-pattern'
import { UniversalError } from '../common/class/universal-error'
import { EExceptions } from '../common/enum/exceptions'
import { UserCreateDto } from './dto/user-create.dto'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { ERole } from '../common/enum/role.enum'
import { RoleService } from '../role/role.service'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@Inject(BcryptService)
		private readonly bcryptService: BcryptService,
		@Inject(RoleService)
		private readonly roleService: RoleService
	) {
	}

	async findOneByProperties(properties: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
		return await this.userRepository.findOne({ where: properties })
	}

	async create(userCreateDto: UserCreateDto): Promise<UserEntity> {
		const userBuilder = Builder(UserEntity)

		userBuilder
			.email(userCreateDto.email)
			.password(await this.bcryptService.hash(userCreateDto.password))

		const roleInstances = await Promise.all(
			userCreateDto.roles.map(async (role: ERole) => {
				return await this.roleService.findOneByProperties({ name: role })
			})
		)

		userBuilder.roles(roleInstances)

		return await this.userRepository.save(userBuilder.build())
	}

	async getMe(userId: string): Promise<MeResponseDto> {
		const user = await this.userRepository.findOne({
			where: {
				id: userId
			}
		})
		if (!user) {
			Builder(UniversalError)
				.messages(['User not found'])
				.exceptionBaseClass(EExceptions.badRequest)
				.build().throw()
		}

		const MeResponseDtoBuilder = Builder(MeResponseDto)
		MeResponseDtoBuilder
			.id(user.id)
			.email(user.email)
			.createdAt(user.createdAt)
			.updatedAt(user.updatedAt)
		return MeResponseDtoBuilder.build()
	}
}