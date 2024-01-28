import { registerAs } from '@nestjs/config'
import * as process from 'process'

export default registerAs('app', () => {
	return {
		nodeEnv: process.env.NODE_ENV || 'development',
		port: parseInt(process.env.PORT, 10) || 3000,
		address: process.env.ADDRESS || 'https://someaddress.su/api',
		redirect: process.env.REDIRECT || 'https://somefrontaddress.su'
	}
})