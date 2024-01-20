import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
	name: 'role'
})
export class RoleEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	name: string

	@Column({nullable: true})
	description?: string
}