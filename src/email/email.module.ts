import { Module } from '@nestjs/common'
import { EmailService } from '@src/email/email.service'

@Module({
	providers: [EmailService]
})
export class EmailModule {}