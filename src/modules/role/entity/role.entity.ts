import { Column, Entity, ManyToMany } from 'typeorm'
import { UserEntity } from '../../user/entity/user.entity'
import { ERole } from '../../common/enum/role.enum'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'

@Entity({
    name: 'role',
})
export class RoleEntity extends DefaultDatabaseEntity<RoleEntity> {
    @Column({ unique: true })
    name: ERole

    @Column({ nullable: true })
    description?: string

    @ManyToMany(
        () => UserEntity,
        (user) => user.roles,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        },
    )
    users: UserEntity[]
}