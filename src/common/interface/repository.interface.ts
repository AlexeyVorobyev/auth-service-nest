export interface IRepository<Entity, Filter, Order, UpdateResult> {
	getAll(filter?: Filter, order?: Order, page?: number, perPage?: number): Entity[] | Promise<Entity[]>

	getOne(filter?: Filter): Entity | Promise<Entity>

	saveOne(entity: Entity): Entity | Promise<Entity>

	saveAll(entities: Entity[]): Entity[] | Promise<Entity[]>

	update(filter: Filter, entity: Partial<Entity>) : UpdateResult | Promise<UpdateResult>

	delete(filter: Filter): void | Promise<void>

	count(filter?: Filter): number | Promise<number>
}
