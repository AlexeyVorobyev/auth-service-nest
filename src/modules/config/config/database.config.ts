import { registerAs } from '@nestjs/config'
import * as process from 'process'

export default registerAs('database', () => {
	return {
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT, 10) || 5432,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME
	}
})