import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'
import { UserEntity } from '@modules/user/entity/user.entity'

/**
 *  Entity describing external services, that uses this auth system
 * */
@Entity({ name: 'external_service' })
export class ExternalServiceEntity extends DefaultDatabaseEntity<ExternalServiceEntity> {
    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    /**Key to recognise requests from external services*/
    @Column({
        name: 'recognition_key',
        unique: true
    })
    recognitionKey: string

    @ManyToMany(
        type => UserEntity,
        user => user.externalServices,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }
    )
    users: UserEntity[]
}