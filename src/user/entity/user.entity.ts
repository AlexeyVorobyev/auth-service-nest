import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { RoleEntity } from '../../role/entity/role.entity'

@Entity({
	name: 'user'
})
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@ManyToMany(
		() => RoleEntity,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinTable({
		name: 'user_role',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id'
		}
	})
	roles: RoleEntity[]

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date
}