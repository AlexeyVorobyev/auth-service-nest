import { CommandFactory } from 'nest-commander'
import { AppModule } from '@src/app.module'
import { config } from 'dotenv'

async function bootstrap() {
    config({
        path: 'env/.env'
    })
    await CommandFactory.run(AppModule)
}

bootstrap()

