import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from './entity/user.entity'
import { MeResponseDto } from './dto/me-response.dto'
import { Builder } from 'builder-pattern'
import { UniversalError } from '../common/class/universal-error'
import { EUniversalExceptionType } from '../common/enum/exceptions'
import { UserCreateDto } from './dto/user-create.dto'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { ERole } from '../common/enum/role.enum'
import { FORBIDDEN_ERROR_MESSAGE } from '../common/constant'
import { UserCreateResponseDto } from './dto/user-create-response.dto'
import { UserRepository } from './repository/user.repository'
import { UserGetAllDto } from './dto/user-get-all.dto'
import { Between, Like } from 'typeorm'
import { sortDtoListFindOptionsOrderAdapter } from '../common/adapter/sort-dto-list-find-options-order.adapter'
import { userEntityToUserResponseDtoAdapter } from './adapter/user-entity-to-user-response-dto.adapter'
import { UserGetAllResponseDto } from './dto/user-get-all-response.dto'
import { RoleRepository } from '../role/repository/role.repository'
import { UserUpdateDto } from '@src/user/dto/user-update.dto'
import { UserUpdateMeDto } from '@src/user/dto/user-update-me.dto'

@Injectable()
export class UserService {
	constructor(
		@Inject(UserRepository)
		private readonly userRepository: UserRepository,
		@Inject(BcryptService)
		private readonly bcryptService: BcryptService,
		@Inject(RoleRepository)
		private readonly roleRepository: RoleRepository
	) {
	}

	async getAll(params: UserGetAllDto): Promise<UserGetAllResponseDto> {
		const userEntityInstances = await this.userRepository.getAll(
			{
				email: Like(`%${params.simpleFilter}%`),
				createdAt: params.createDatePeriod ? Between(
					params.createDatePeriod.startDate || new Date(new Date().setFullYear(0,0,0)),
					params.createDatePeriod.endDate || new Date(new Date().setFullYear(10000,0,0))
				) : undefined,
				updatedAt: params.updateDatePeriod ? Between(
					params.updateDatePeriod.startDate || new Date(new Date().setFullYear(0,0,0)),
					params.updateDatePeriod.endDate || new Date(new Date().setFullYear(10000,0,0))
				) : undefined,
				roles: {
					name: params.roleFilter
				}
			},
			sortDtoListFindOptionsOrderAdapter<UserEntity>(
				params.sort,
				Builder(UserEntity)
					.id(null).email(null).password(null)
					.createdAt(null).updatedAt(null).roles(null)
					.verified(null)
					.build()
			),
			params.page,
			params.perPage,
			{ roles:true }
		)

		const totalElements = await this.userRepository.count({
			email: Like(`%${params.simpleFilter}%`),
			createdAt: params.createDatePeriod ? Between(
				params.createDatePeriod.startDate || new Date(new Date().setFullYear(0,0,0)),
				params.createDatePeriod.endDate || new Date(new Date().setFullYear(10000,0,0))
			) : undefined,
			updatedAt: params.updateDatePeriod ? Between(
				params.updateDatePeriod.startDate || new Date(new Date().setFullYear(0,0,0)),
				params.updateDatePeriod.endDate || new Date(new Date().setFullYear(10000,0,0))
			) : undefined,
			roles: {
				name: params.roleFilter
			}
		})

		const userGetAllResponseDtoBuilder = Builder(UserGetAllResponseDto)
		userGetAllResponseDtoBuilder
			.list(
				userEntityInstances
					.map((userEntityInstance: UserEntity) => userEntityToUserResponseDtoAdapter(userEntityInstance))
			)
			.currentPage(params.page)
			.elementsPerPage(params.perPage)
			.totalElements(totalElements)
			.totalPages(Math.ceil(totalElements / params.perPage))
		return userGetAllResponseDtoBuilder.build()
	}

	async getOne(id: string): Promise<MeResponseDto> {
		const user = await this.userRepository.getOne({ id: id })
		return userEntityToUserResponseDtoAdapter(user)
	}

	async create(
		userCreateDto: UserCreateDto,
		userRoles?: ERole[]
	): Promise<UserCreateResponseDto> {
		if (userRoles) {
			const activeUserHighRole = userRoles.includes(ERole.Admin) ? ERole.Admin : ERole.Moderator
			const allowedRolesAssertion = activeUserHighRole === ERole.Admin ? [ERole.User, ERole.Moderator] : [ERole.User]
			userCreateDto.roles.forEach((role: ERole) => {
				if (!allowedRolesAssertion.includes(role)) {
					Builder(UniversalError)
						.messages([
							FORBIDDEN_ERROR_MESSAGE,
							`You cant create user with ${role} role`
						])
						.exceptionBaseClass(EUniversalExceptionType.forbidden)
						.build().throw()
				}
			})
		}
		const roleInstances = await Promise.all(
			userCreateDto.roles.map((role: ERole) => {
				return this.roleRepository.getOne({ name: role })
			})
		)

		const userBuilder = Builder(UserEntity)
		userBuilder
			.email(userCreateDto.email)
			.password(await this.bcryptService.hash(userCreateDto.password))
			.roles(roleInstances).verified(userCreateDto.verified)
		const createdUserEntityInstance = await this.userRepository.saveOne(userBuilder.build())

		return userEntityToUserResponseDtoAdapter(createdUserEntityInstance)
	}

	async update(
		id: string,
		userUpdateDto: UserUpdateDto,
		userRoles: ERole[]
	) {
		const userToUpdate = await this.userRepository.getOne({ id: id })
		const activeUserHighRole = userRoles.includes(ERole.Admin) ? ERole.Admin : ERole.Moderator

		if (activeUserHighRole === ERole.Admin) {
			if (userToUpdate.roles.map((role) => role.name).includes(ERole.Admin)) {
				Builder(UniversalError)
					.messages([
						FORBIDDEN_ERROR_MESSAGE,
						'You cant update other admins'
					])
					.exceptionBaseClass(EUniversalExceptionType.forbidden)
					.build().throw()
			}
		}
		if (activeUserHighRole === ERole.Moderator) {
			if (
				userToUpdate.roles.map((role) => role.name).includes(ERole.Admin)
				|| userToUpdate.roles.map((role) => role.name).includes(ERole.Moderator)
			) {
				Builder(UniversalError)
					.messages([
						FORBIDDEN_ERROR_MESSAGE,
						'You cant update other admins or moderators'
					])
					.exceptionBaseClass(EUniversalExceptionType.forbidden)
					.build().throw()
			}
		}

		const allowedRolesAssertion = activeUserHighRole === ERole.Admin ? [ERole.User, ERole.Moderator] : [ERole.User]
		userToUpdate.roles.forEach((role) => {
			if (!allowedRolesAssertion.includes(role.name)) {
				Builder(UniversalError)
					.messages([
						FORBIDDEN_ERROR_MESSAGE,
						`You cant assign to user ${role.name} role`
					])
					.exceptionBaseClass(EUniversalExceptionType.forbidden)
					.build().throw()
			}
		})
		const roleInstances = userUpdateDto.roles ? await Promise.all(
			userUpdateDto.roles.map((role: ERole) => {
				return this.roleRepository.getOne({ name: role })
			})
		) : undefined

		await this.userRepository.update(
			{ id: id },
			Builder(UserEntity)
				.email(userUpdateDto?.email || undefined)
				.password(userUpdateDto?.password ? await this.bcryptService.hash(userUpdateDto.password) : undefined)
				.roles(roleInstances).verified(userUpdateDto?.verified || undefined)
				.build()
		)
	}

	async delete(id: string) {
		const userToDelete = await this.userRepository.getOne({ id: id })
		if (userToDelete.roles.map((role) => role.name).includes(ERole.Admin)) {
			Builder(UniversalError)
				.messages([
					FORBIDDEN_ERROR_MESSAGE,
					'You cant delete other admins'
				])
				.exceptionBaseClass(EUniversalExceptionType.forbidden)
				.build().throw()
		} else {
			await this.userRepository.delete({ id: id })
		}
	}

	async updateMe(id:string, userUpdateMeDto: UserUpdateMeDto) {
		await this.userRepository.update(
			{id : id},
			Builder(UserEntity)
				.email(userUpdateMeDto?.email || undefined)
				.password(userUpdateMeDto?.password ? await this.bcryptService.hash(userUpdateMeDto.password) : undefined)
				.build()
		)
	}
}