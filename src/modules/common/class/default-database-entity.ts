import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { databaseDateTransformer } from '@modules/database/utils/database-date.transformer'

/**
 *  Class, that describes base structure of every table in a database
 * */
export abstract class DefaultDatabaseEntity<ExtendedEntity> {
    protected constructor(data?: Partial<ExtendedEntity>) {
        if (data) Object.assign(this, data)
    }

    @PrimaryGeneratedColumn('uuid')
    public id: string

    @CreateDateColumn({
        type: 'timestamptz',
        transformer: databaseDateTransformer,
        name: 'created_at'
    })
    public createdAt: Date

    @UpdateDateColumn({
        type: 'timestamptz',
        transformer: databaseDateTransformer,
        name: 'updated_at'
    })
    public updatedAt: Date
}