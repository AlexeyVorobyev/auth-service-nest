import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { RoleEntity } from '@modules/role/entity/role.entity'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'
import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { ExternalRoleEntity } from '@modules/role/entity/external-role.entity'

@Entity({
    name: 'user',
})
export class UserEntity extends DefaultDatabaseEntity<UserEntity> {
    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ default: false })
    verified: boolean

    @ManyToMany(
        () => RoleEntity,
        (role) => role.users,
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

    @ManyToMany(
        () => ExternalServiceEntity,
        (externalService) => externalService.users,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            eager: true,
        },
    )
    @JoinTable({
        name: 'user_external_service',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'external_service_id',
            referencedColumnName: 'id',
        },
    })
    externalServices: ExternalServiceEntity[]

    @OneToMany(
        () => ExternalRoleEntity,
        (externalRole) => externalRole.users,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            eager: true,
        },
    )
    externalRoles: ExternalRoleEntity[]
}