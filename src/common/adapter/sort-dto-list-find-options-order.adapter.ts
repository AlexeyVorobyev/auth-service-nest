import { SortDto } from '../dto/sort.dto'
import { FindOptionsOrder } from 'typeorm'

export const sortDtoListFindOptionsOrderAdapter = <Entity extends Object>(sortDtoInstances: SortDto[], entity: Entity): FindOptionsOrder<Entity> => {
	return Object.fromEntries(
		sortDtoInstances
			.filter((sortDtoInstance) => entity.hasOwnProperty(sortDtoInstance.columnName))
			.map((sortDtoInstance) => {
				return [
					sortDtoInstance.columnName,
					sortDtoInstance.direction
				]
			})
	) as FindOptionsOrder<Entity>
}