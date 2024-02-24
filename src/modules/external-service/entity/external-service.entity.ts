import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { DefaultDatabaseEntity } from '@modules/common/class/default-database-entity'

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
}