import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'
import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { UserEntity } from '@modules/user/entity/user.entity'

/**
 *  Entity describing roles in user related external services
 * */
@Entity({ name: 'external_role' })
export class ExternalRoleEntity extends DefaultDatabaseEntity<ExternalRoleEntity> {
    @Column()
    name: string

    @Column({ nullable: true })
    description?: string

    @ManyToOne(
        () => ExternalServiceEntity,
        (service) => service.externalRoles,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        },
    )
    @JoinColumn({name: 'external_service_id'})
    externalServices: ExternalServiceEntity[]

    @ManyToOne(
        () => UserEntity,
        (user) => user.externalRoles,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        },
    )
    @JoinColumn({name: 'user_id'})
    users: UserEntity[]
}