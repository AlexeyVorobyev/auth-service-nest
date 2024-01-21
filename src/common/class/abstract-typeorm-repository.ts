import { IRepository } from '../interface/repository.interface'
import { FindOptionsOrder, FindOptionsWhere, Repository, UpdateResult } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { Builder } from 'builder-pattern'
import { UniversalError } from './universal-error'
import { EUniversalExceptionType } from '../enum/exceptions'

export abstract class AbstractTypeormRepository<Entity> implements IRepository<Entity, FindOptionsWhere<Entity>, FindOptionsOrder<Entity>, UpdateResult> {
	protected constructor(
		private readonly entryPoint: Repository<Entity>
	) {
	}

	async getAll(filter?: FindOptionsWhere<Entity>, order?: FindOptionsOrder<Entity>, page?: number, perPage?: number): Promise<Entity[]> {
		return await this.entryPoint.find({
			where: filter || undefined,
			order: order || undefined,
			skip: page * perPage || undefined,
			take: perPage || undefined
		})
	}

	async getOne(filter?: FindOptionsWhere<Entity>): Promise<Entity> {
		const entityInstance =  await this.entryPoint.findOne({
			where: filter || undefined
		})
		if (!entityInstance) {
			Builder(UniversalError)
				.messages(['Entity not found'])
				.exceptionBaseClass(EUniversalExceptionType.badRequest)
				.build().throw()
		}
		return entityInstance
	}

	async count(filter?: FindOptionsWhere<Entity>): Promise<number> {
		return await this.entryPoint.count({
			where: filter || undefined
		})
	}

	async saveOne(entity: Entity): Promise<Entity> {
		return await this.entryPoint.save(entity)
	}

	async saveAll(entities: Entity[]): Promise<Entity[]> {
		return await this.entryPoint.save(entities)
	}

	async update(filter: FindOptionsWhere<Entity>, entity: Partial<Entity>): Promise<UpdateResult> {
		await this.getOne(filter)
		return await this.entryPoint.update(filter, instanceToPlain(entity))
	}

	async delete(filter: FindOptionsWhere<Entity>): Promise<void> {
		await this.getOne(filter)
		await this.entryPoint.delete(filter)
	}
}