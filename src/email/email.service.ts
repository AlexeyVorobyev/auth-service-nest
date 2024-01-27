import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { UserEntity } from '@src/user/entity/user.entity'
import {render} from '@react-email/render'
import { VerifyEmailTemplate } from '@src/email/template/verify-email.template'
import { ReactElement } from 'react'

@Injectable()
export class EmailService {
	constructor(
		private mailerService: MailerService
	) {
	}

	async sendUserConfirmation(user: UserEntity) {
		await this.mailerService.sendMail({
			to: user.email,
			subject: 'Welcome to our app! Confirm your Email.',
			html: render(VerifyEmailTemplate({username:user.email}) as ReactElement),
			context: {
				name:user.email
			}
		})
	}
}