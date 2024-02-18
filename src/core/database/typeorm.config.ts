import {DataSource} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {config} from 'dotenv';
import {databaseEntities} from './database.entities';
import * as path from 'path';

config({
    path: path.resolve(`./.env`)
})
config({
    path: path.resolve(`./.env.${process.env.NODE_ENV}`),
})

const configService = new ConfigService()

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.name'),
    entities: [...databaseEntities],
    synchronize: false,
    logging: configService.get('NODE_ENV') === 'development',
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
})