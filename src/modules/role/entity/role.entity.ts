import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../user/entity/user.entity'
import { ERole } from '../../common/enum/role.enum'

@Entity({
	name: 'role'
})
export class RoleEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	name: ERole

	@Column({ nullable: true })
	description?: string

	@ManyToMany(
		type => UserEntity,
		user => user.roles,
		{
			onDelete: 'NO ACTION',
			onUpdate: 'NO ACTION'
		}
	)
	users: UserEntity[]
}