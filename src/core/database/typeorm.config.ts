import {DataSource} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {config} from 'dotenv';
import {databaseEntities} from './database.entities';
import * as path from 'path';
config({
    path: path.resolve(`env/.env`)
})

const configService = new ConfigService()

console.log(configService)

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [...databaseEntities],
    synchronize: false,
    logging: configService.get('NODE_ENV') === 'development',
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
})