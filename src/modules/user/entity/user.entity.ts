import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { RoleEntity } from '@modules/role/entity/role.entity'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'

@Entity({
    name: 'user',
})
export class UserEntity extends DefaultDatabaseEntity<UserEntity> {
    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @ManyToMany(
        type => RoleEntity,
        role => role.users,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            eager: true,
        },
    )
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: RoleEntity[]

    @Column({ default: false })
    verified: boolean
}